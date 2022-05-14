# This script can be used to populate the database with dummy data

# Imports
import datetime
import math
from pick import pick
import requests
import time
import sys
import os
from faker import Faker
import faker_commerce
from random import randint, choice, randrange, sample
from queue import Queue
from threading import Thread
from rich.table import Table
from rich.live import Live
from requests.exceptions import ConnectionError

# Constants
API_BASE_URL = "http://api.greenly.pt"
API_PORT = 80
USER_CREATION_ENDPOINT = "/user"
LOGIN_ENDPOINT = "/auth/login"
q = Queue()
table = Table(title="Added Users", show_lines=True)



def worker():
    while True:
        user = q.get()
        result = sendUser(user)
        q.task_done()
        table.add_row(f"{user.firstName} {user.lastName}", user.email, user.phone, "✅" if result else "❌")

def genRandomDate():
    start_date = datetime.date(2018, 12, 12)
    end_date = datetime.date(2025, 12, 12)

    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)

    return str(random_date)
        

class User:
    def __init__(self, firstName, lastName, password, nif, email, phone, type, street, city, postalCode, country, companyName, companyEmail, companyBio):
        self.firstName      = firstName
        self.lastName       = lastName
        self.password       = password
        self.nif            = nif
        self.email          = email
        self.phone          = phone
        self.type           = type
        self.street         = street
        self.city           = city
        self.postalCode     = postalCode
        self.country        = country
        self.companyName    = companyName
        self.companyEmail   = companyEmail
        self.companyBio     = companyBio

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
    users = [User(fake.first_name(),
                 fake.last_name(),
                 fake.password(length=9),
                 randint(333333333, 999999999),
                 fake.free_email(),
                 fake.phone_number(),
                 choice(["SUPPLIER", "TRANSPORTER", "CONSUMER"]),
                 fake.street_address(),
                 fake.city(),
                 fake.postcode(),
                 fake.country(),
                 fake.company(),
                 fake.free_email(),
                 fake.catch_phrase()) for i in range(amount)]
    return users
    
def sendUser(user):
    global API_BASE_URL
    global API_PORT

    userDataPayload = {'first_name':    user.firstName,
               'last_name':     user.lastName,
               'password':      user.password,
               'email':         user.email,
               'phone':         user.phone,
               'type':          user.type}

    if (user.type in ['SUPPLIER', 'TRANSPORTER']):
        userDataPayload['company'] = {'name':     user.companyName,
                                      'email':    user.companyEmail,
                                      'bio':      user.companyBio}

    addressDataPayload = {'street':      user.street,
                          'city':        user.city,
                          'country':     user.country,
                          'postal_code': user.postalCode,
                          'nif': user.nif}

    authPayload = {'email': user.email,
                   'password': user.password}

    
    try:
        userResponse = requests.post(f"{API_BASE_URL}:{API_PORT}{USER_CREATION_ENDPOINT}", json=userDataPayload)

        authResponse = requests.post(f"{API_BASE_URL}:{API_PORT}{LOGIN_ENDPOINT}", json=authPayload)

        authenticatedHeaders = {'Authorization': f'Bearer {authResponse.json()["token"]}'}

        # Address creation requires authentication
        addressResponse = requests.post(f"{API_BASE_URL}:{API_PORT}{USER_CREATION_ENDPOINT}/{userResponse.json()['id']}/addresses", json=addressDataPayload, headers=authenticatedHeaders)
    except ConnectionError:
        os.system('clear')
        print(f"{API_BASE_URL}:{API_PORT} didn't respond.")
        os._exit(1)

    return userResponse.status_code == 201 and addressResponse.status_code == 201

def genProductsSQL(amount, usersInDB):
    # FIXME: Mentioned Suppliers and Transporters may not be of types Supplier and Transporter


    fake = Faker("pt_PT")
    fake.add_provider(faker_commerce.Provider)
    lineBuffer = []

    # Choose amount/5 suppliers
    possibleSuppliers = sample(range(1, usersInDB), math.ceil(amount/5))

    possibleTransporters = sample(range(1, usersInDB), math.ceil(amount/5))

    # Create amount/5 categories
    # TODO: Eventually curate a list of category names instead of random names
    possibleCategories = [fake.words(nb=1)[0].capitalize() for i in range(math.ceil(amount/5))]

    
    lineBuffer.append("#Warehouses")
    for i, supplier in enumerate(possibleSuppliers):
        for j in range(3):
            randomAddress = randint(1, usersInDB)
            randomCapacity = randint(20, 50)
            randomResourceUsage = randint(20, 50)

            lineBuffer.append(f"INSERT INTO Warehouse VALUES ({j+1}, {randomAddress}, {randomCapacity}, {randomResourceUsage}, {supplier});")
    
    # Generate parent categories
    lineBuffer.append("#Categories")
    categoryIdCounter = 1
    for category in possibleCategories:
        parentCategory = categoryIdCounter
        lineBuffer.append(f"INSERT INTO Category (id, name) VALUES ({parentCategory}, '{category}');")

        categoryIdCounter += 1
        
        # Generate 1-3 sub-categories
        for i in range(randint(1,3)):
            lineBuffer.append(f"INSERT INTO Category VALUES ({categoryIdCounter}, '{fake.words(nb=1)[0].capitalize()}', {parentCategory});")
            categoryIdCounter+=1

    # Generate products (#TODO: Eventually create products which have complements)
    lineBuffer.append("#Products")
    for i in range(1, amount+1):
        lineBuffer.append(
            f"INSERT INTO Product (id, name, description, category) VALUES ({i}, '{fake.ecommerce_name()}', '{fake.text(max_nb_chars=220)}', {randint(1, categoryIdCounter-1)});")

    # Generate supplies
    lineBuffer.append("#Supplies")
    suppliesRegistered = set()
    for i in range(1, amount+1):
        for j in range(randint(1, 3)):


            randomSupplier = choice(possibleSuppliers)
            randomWarehouse = randint(1,3)
            while (i, randomSupplier, randomWarehouse) in suppliesRegistered:

                randomSupplier = choice(possibleSuppliers)
                randomWarehouse = randint(1,3)
        
            # Avoiding duplicate supply sales
            suppliesRegistered.add((i, randomSupplier, randomWarehouse))

            lineBuffer.append(f"INSERT INTO Supply (product, supplier, warehouse, quantity, price, production_date, expiration_date) VALUES ({i}, {randomSupplier}, {randomWarehouse}, {randint(1, 300)}, {randint(1, 3000)}, '{genRandomDate()}', '{genRandomDate()}');")

    # Add tranporters to Supply_Transporter for each supply created
    transportsRegistered = set()
    for product, supplier, warehouse in suppliesRegistered:
        # Register a random amount of transporters for the current supply

        for i in range(randint(1, 3)):

            randomTransporter = choice(possibleTransporters)

            # Avoiding duplicate transports for same supply
            while (product, supplier, warehouse, randomTransporter) in transportsRegistered:
                randomTransporter = choice(possibleTransporters)

            transportsRegistered.add((product, supplier, warehouse, randomTransporter))

            #TODO: Generate a transporting cost (per km because you don't know distance yet) here!!
            lineBuffer.append(f"INSERT INTO Supply_Transporter VALUES ({product}, {supplier}, {warehouse}, {randomTransporter});")

    f = open("mock.sql", "w")
    f.write("\n".join(lineBuffer))
    f.close()
    print("SQL generated to 'mock.sql'")

def main():
    global API_BASE_URL
    global API_PORT

    generationOptions = ["Users", "Products"]
    APIOptions = ["Remote (api.greenly.pt)", "Local (localhost:8080)"]

    generationOption, index = pick(generationOptions, 'Choose what to generate: ', indicator='->', default_index=0)
    APIOption, APIIndex = pick(APIOptions, 'Choose which API to use: ', indicator='->', default_index=0)

    if (APIIndex == 1):
        API_BASE_URL = "http://localhost"
        API_PORT = 8080

    if (generationOption == "Users"):
        print(f"Requesting at {API_BASE_URL}:{API_PORT}{USER_CREATION_ENDPOINT}\n")

        start = time.time()
        [q.put(user) for user in genUsers(int(input("How many users to generate? ")))]

        for i in range(int(input("How many threads to run? "))):
            t = Thread(target=worker)
            t.daemon = True
            t.start()

        table.add_column("User Name", style="blue")
        table.add_column("E-mail", style="blue")
        table.add_column("Phone", style="blue")
        # table.add_column("NIF", style="blue")
        table.add_column("Status", justify="right", style="green")

        with Live(table, refresh_per_second=10, vertical_overflow="visible") as live:  # update 4 times a second to feel fluid
            while not q.empty():
                live.update(table)

        q.join()

        end = time.time()

        print("Time elapsed: ", end-start)
    elif (generationOption == "Products"):
        print("Temporarily generating only SQL.\n")
        usersInDB = int(input("How many users are currently registed in the database? "))
        amount = int(input("How many products would you like to generate? "))
        genProductsSQL(amount, usersInDB)





    


if __name__ == "__main__":
    main()
