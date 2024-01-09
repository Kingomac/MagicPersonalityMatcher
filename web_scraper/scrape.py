from typing import Literal, Union
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver import FirefoxOptions
from .scraped_types import ScrapedCharacter, ScrapedSerie, personality_is_valid
import requests
import os
import time
from threading import Timer
from slugify import slugify


def save_image(url: str, filename: str):
    """
        This function will save an image from a url to the specified filename
        :param url: The url of the image
        :param filename: The filename to save the image to
        :return: None
    """
    try:
        response = requests.get(url)
        if response.status_code != 200:
            raise Exception("HTTP error: ", response.status_code)
        with open(filename, 'wb') as handle:
            handle.write(response.content)
    except Exception as e:
        print(f"ERROR SAVING IMAGE ({url}): ", e)


def name_to_filename(name: str):
    """
        This function will convert a string to a valid filename
        :param name: The string to convert
        :return: The converted string
    """
    return slugify(name)
    # return name.replace(" ", "_").replace('(', '').replace(')', '').lower()


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
                print("SERIE NAME: ", serie_name)
                # Get serie cover art image
                cover_art = (
                    WebDriverWait(browser, 10)
                    .until(EC.presence_of_element_located((By.CLASS_NAME, "summary")))
                    .find_element(By.CLASS_NAME, "avatar")
                    .find_element(By.TAG_NAME, "img")
                    .get_attribute("src")
                )
                static_cover_art = f"/static/serie/{name_to_filename(serie_name)}.png"
                save_image(cover_art, f"backend/{static_cover_art}")
                serie = ScrapedSerie(name=serie_name, image=static_cover_art)
                print("serie: ", serie_name, " | cover art: ", static_cover_art)
                # Get all character profile cards
                elements = WebDriverWait(browser, 10).until(
                    EC.presence_of_all_elements_located(
                        (By.CLASS_NAME, "profile-card"))
                )
                print("number of elements: ", len(elements))
                try:
                    os.mkdir(
                        f"backend/static/character/{name_to_filename(serie_name)}")
                except FileExistsError:
                    print("Directory already exists")

                def scroll_page(browser, actual_height, page_height):
                    if actual_height >= page_height:
                        return
                    browser.execute_script(
                        f"window.scrollBy(0, {actual_height})")
                    new_height = actual_height + 100  # Ajusta la cantidad de desplazamiento aquí
                    timer = Timer(1, scroll_page, args=(
                        browser, new_height, page_height))
                    timer.start()
                    timer.join()

                page_height = browser.execute_script(
                    "return document.body.scrollHeight")
                scroll_page(browser, 0, page_height)

                # Iterate over all cards and get the information
                for el in elements:
                    character_name = el.find_element(
                        By.CLASS_NAME, "info-name").text
                    character_avatar = el.find_element(
                        By.TAG_NAME, "img").get_attribute("src")
                    static_avatar = f"/static/character/{name_to_filename(serie_name)}/{name_to_filename(character_name)}.png"
                    print("avatar: ", character_avatar)
                    save_image(character_avatar, f"backend/{static_avatar}")
                    character_personality = el.find_element(
                        By.CLASS_NAME, "personality").text
                    print("character: ", character_name,
                          " | avatar: ", static_avatar,
                          " | personality: ", character_personality)
                    if personality_is_valid(character_personality):
                        characters.append(ScrapedCharacter(
                            name=character_name, image=static_avatar, personality=character_personality))

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
            except Exception as e:
                print("Exception: " + e.strerror)
                print(e.with_traceback())
                break
    except Exception as e:
        print("Exception: " + e.strerror)
        print(e.with_traceback())
    finally:
        print("Scrape reached end")
        browser.quit()
        print("serie: ", serie)
        print("characters: ", characters)
        return (serie, characters)


if __name__ == "__main__":
    scrape("https://www.personality-database.com/profile?pid=2&cid=7&sub_cat_id=1064")
