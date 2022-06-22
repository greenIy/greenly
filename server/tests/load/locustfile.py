from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    def on_start(self):
        self.client.post("/auth/login", json={"email":"test@test.com", "password":"teste"})
        # self.client.verify = False


    @task
    def getProducts(self):
        self.client.get("/store/products")
        self.client.get("/store/suppliers")

    @task(3)
    def view_item(self):
        for item_id in range(1, 51):
            self.client.get(f"/store/products/{item_id}")