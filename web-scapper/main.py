from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException

options = webdriver.FirefoxOptions()
options.add_argument('--headless')

browser = webdriver.Firefox(options=options)
browser.get('https://www.personality-database.com/profile?pid=2&cid=7&sub_cat_id=1064')

try :
    page_number = 1
    while True:
        try:
            elements = WebDriverWait(browser, 10).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "profile-card"))
            )
            container = WebDriverWait(browser, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "profile-container"))
            )
            for el in elements:
                character_name = el.find_element(By.CLASS_NAME, "info-name").text
                character_personality = el.find_element(By.CLASS_NAME, "personality").text

                
                print(f"Name: {character_name} | Personality: {character_personality}")
                print(50*'*')
            elements = WebDriverWait(browser, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "rc-pagination-item")))
            for el in elements:
                if page_number + 1 == int(el.text):
                    el.click()
                    page_number += 1
                    WebDriverWait(browser, 30).until(lambda driver: container.text != driver.find_element(By.CLASS_NAME, "profile-container").text)
                    WebDriverWait(browser, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, "rc-pagination-item-active")))
                    print(50*'%')
                    print("page: " + el.text)
                    break
        except TimeoutException as e:
            print("No more entries: " + e.strerror)
            print(e.with_traceback())
            break
finally:
    print("nop")
    browser.quit()