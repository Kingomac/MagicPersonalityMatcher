from typing import Literal, Union
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver import FirefoxOptions
from .scraped_types import ScrapedCharacter, ScrapedSerie, personality_is_valid


def scrape(url: str):
    """
        This function will scrape the personality-database.com website and get name, image and personality of all the characters from a serie
        :param url: The url of the serie to scrape
        :return: A tuple with the scraped serie and a list of characters
    """
    # Use specified browser to open the url
    options = FirefoxOptions()
    options.add_argument("--headless")
    browser = webdriver.Firefox(options)
    browser.get(url)
    serie: ScrapedSerie = None
    characters: list[ScrapedCharacter] = []

    try:
        page_number = 1
        while True:
            try:
                # Get serie name
                serie_name = (
                    WebDriverWait(browser, 10)
                    .until(
                        EC.presence_of_element_located(
                            (By.CLASS_NAME, "community-title")
                        )
                    )
                    .text
                )
                # Get serie cover art image
                cover_art = (
                    WebDriverWait(browser, 10)
                    .until(EC.presence_of_element_located((By.CLASS_NAME, "summary")))
                    .find_element(By.CLASS_NAME, "avatar")
                    .find_element(By.TAG_NAME, "img")
                    .get_attribute("src")
                )
                serie = ScrapedSerie(name=serie_name, image=cover_art)
                # Get all character profile cards
                elements = WebDriverWait(browser, 10).until(
                    EC.presence_of_all_elements_located(
                        (By.CLASS_NAME, "profile-card"))
                )
                print("number of elements: ", len(elements))
                # Iterate over all cards and get the information
                for el in elements:
                    character_name = el.find_element(
                        By.CLASS_NAME, "info-name").text
                    character_avatar = el.find_element(
                        By.TAG_NAME, "img").get_attribute("src")
                    character_personality = el.find_element(
                        By.CLASS_NAME, "personality").text
                    # print("character: ", character_name,
                    #      " | avatar: ", character_avatar,
                    #      " | personality: ", character_personality)
                    if personality_is_valid(character_personality):
                        characters.append(ScrapedCharacter(
                            name=character_name, image=character_avatar, personality=character_personality))

                # Get pagination elements
                pelements = WebDriverWait(browser, 10).until(
                    EC.presence_of_all_elements_located(
                        (By.CLASS_NAME, "rc-pagination-item")
                    )
                )
                print("pagination elements: ", len(elements))
                # Iterate over all pages and click on the next one if there's any
                for el in pelements:
                    print("page number checking: ", el.text)
                    if page_number + 1 == int(el.text):
                        el.click()
                        page_number += 1
                        print("aaaaaaaaaaaaaaaaa waiting for staleness")
                        WebDriverWait(browser, 30).until(
                            EC.staleness_of(elements[0])
                        )
                        print("aaaaaaaaaaaaaaaaa waiting for clickable")
                        WebDriverWait(browser, 10).until(
                            EC.element_to_be_clickable(
                                (By.CLASS_NAME, "profile-container")
                            )
                        )
                        print(50 * "%")
                        print("page: " + el.text)
                        break
            except TimeoutException as e:
                print("No more entries: " + e.strerror)
                print(e.with_traceback())
                break
    finally:
        print("Scrape reached end")
        browser.quit()
        print("serie: ", serie)
        print("characters: ", characters)
        return (serie, characters)
