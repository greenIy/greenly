# This script can be used to populate the database with dummy data

# Imports
import json
from numpy import True_
import requests
import time
import sys
from faker import Faker
from pprint import pprint
from random import randint, choice
from queue import Queue
from threading import Thread
from rich.table import Table
from rich.live import Live

# Constants
API_BASE_URL = "http://localhost"
PORT = 8080
USER_CREATION_ENDPOINT = "/user"
POOL_SIZE = 5
q = Queue()
table = Table(title="Added Users", show_lines=True)



def worker():
    while True:
        user = q.get()
        result = sendUser(user)
        q.task_done()
        table.add_row(f"{user.firstName} {user.lastName}", user.email, user.phone, str(user.nif), "✅" if result == 201 else "❌")
        

class User:
    def __init__(self, firstName, lastName, password, nif, email, phone, type, street, city, postalCode, country):
        self.firstName = firstName
        self.lastName = lastName
        self.password = password
        self.nif = nif
        self.email = email
        self.phone = phone
        self.type = type
        self.street = street
        self.city = city
        self.postalCode = postalCode
        self.country = country

    def __str__(self):
        return f"\nFirst Name: {self.firstName}\
                \nLast Name: {self.lastName}\
                \nPassword: {self.password}\
                \nNIF: {self.nif}\
                \nE-mail: {self.email}\
                \nPhone: {self.phone}\
                \nType: {self.type}\
                \nStreet: {self.street}\
                \nCity: {self.city}\
                \nPostal Code: {self.postalCode}\
                \nCountry: {self.country}"

def genUsers(amount):
    fake = Faker("pt_PT")
    return [User(fake.first_name(),
                 fake.last_name(),
                 fake.password(length=9),
                 randint(333333333, 999999999),
                 fake.free_email(),
                 fake.phone_number(),
                 choice(["ADMINISTRATOR", "SUPPLIER", "TRANSPORTER", "CONSUMER"]),
                 fake.street_address(),
                 fake.city(),
                 fake.postcode(),
                 "Portugal") for i in range(amount)]
    
def sendUser(user):
    payload = {"firstName": user.firstName,
               "lastName":  user.lastName,
               "password":  user.password,
               "nif":       user.nif,
               "email":     user.email,
               "phone":     user.phone,
               "type":      user.type,
               "address":   {"street":user.street,
                             "city":user.city,
                             "country":user.country,
                             "postalCode":user.postalCode}}


    r = requests.post(f"{API_BASE_URL}:{PORT}{USER_CREATION_ENDPOINT}", json=payload)

    return r.status_code

def main():
    start = time.time()
    [q.put(user) for user in genUsers(int(input("How many users to generate? ")))]

    for i in range(int(input("How many threads to run? "))):
        t = Thread(target=worker)
        t.daemon = True
        t.start()

    table.add_column("User Name", style="blue")
    table.add_column("E-mail", style="blue")
    table.add_column("Phone", style="blue")
    table.add_column("NIF", style="blue")
    table.add_column("Status", justify="right", style="green")

    with Live(table, refresh_per_second=10, vertical_overflow="visible") as live:  # update 4 times a second to feel fluid
        while not q.empty():
            live.update(table)

    q.join()

    end = time.time()

    print("Time elapsed: ", end-start)




    


if __name__ == "__main__":
    main()