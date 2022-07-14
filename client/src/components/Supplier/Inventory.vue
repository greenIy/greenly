<template>
  <div class="container mt-5">
    <div class="row align-items-start">
      <div class="row align-items-start">
        <div class="row">
          <button
            type="button"
            class="btn btn-secondary ms-3 mb-3 btn-add"
            data-bs-toggle="modal"
            data-bs-target="#modalNewItem"
            style="width: 15%"
          >
            <font-awesome-icon :icon="['fa', 'plus']" />&nbsp; Criar
            fornecimento
          </button>
        </div>
        <div v-if="calculateInventoryLength() <= 0" class="text-center">
          <p class="mt-5 fs-3">Parece que ainda não tem fornecimentos.</p>
        </div>
        <div
          v-for="(item, index) in this.inventory"
          :key="item.id"
          class="accordion mb-4"
          id="accordion"
        >
          <div class="accordion-item">
            <h2 class="accordion-header" :id="'heading' + item.id">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapse' + item.id"
                aria-expanded="false"
                :aria-controls="'collapse' + item.id"
              >
                <div class="container">
                  <span class="fs-5">Fornecimento #{{ item.id }}</span>
                  <hr />
                  <div class="d-flex content-container">
                    <div class="col">
                      <span
                        ><font-awesome-icon :icon="['fa', 'calendar']" />&nbsp;
                        {{
                          `${String(
                            new Date(item.production_date).getDate()
                          ).padStart(2, "0")}/${String(
                            new Date(item.production_date).getMonth() + 1
                          ).padStart(2, "0")}/${new Date(
                            item.production_date
                          ).getFullYear()}`
                        }}</span
                      >
                    </div>
                    <div class="col">
                      <span
                        ><font-awesome-icon :icon="['fa', 'leaf']" />&nbsp;
                        {{ item.product.name }}</span
                      >
                    </div>
                    <div class="col">
                      <span
                        ><font-awesome-icon :icon="['fa', 'tag']" />&nbsp;
                        {{ item.price }}€</span
                      >
                    </div>
                    <div class="col">
                      <span
                        ><font-awesome-icon :icon="['fa', 'warehouse']" />&nbsp;
                        Armazém #{{ item.warehouse.id }}</span
                      >
                    </div>
                  </div>
                </div>
              </button>
            </h2>
            <div
              :id="'collapse' + item.id"
              class="accordion-collapse collapse"
              :aria-labelledby="'heading' + item.id"
            >
              <div class="accordion-body">
                <div class="row ms-4 mt-3">
                  <div class="col">
                    <h5>
                      <font-awesome-icon :icon="['fa', 'leaf']" />&nbsp; Produto
                      #{{ item.product.id }}
                    </h5>
                    <div class="mt-3 ms-3">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td>Nome</td>
                            <td class="text-end">{{ item.product.name }}</td>
                          </tr>
                          <tr>
                            <td>Categoria</td>
                            <td class="text-end">
                              {{ item.product.category.name }}
                            </td>
                          </tr>
                          <tr>
                            <td>Quantidade</td>
                            <td class="text-end">{{ item.quantity }}</td>
                          </tr>
                          <tr>
                            <td>Preço</td>
                            <td class="text-end">{{ item.price }}</td>
                          </tr>
                          <tr>
                            <td>Data de produção</td>
                            <td class="text-end">
                              {{
                                `${String(
                                  new Date(item.production_date).getDate()
                                ).padStart(2, "0")}/${String(
                                  new Date(item.production_date).getMonth() + 1
                                ).padStart(2, "0")}/${new Date(
                                  item.production_date
                                ).getFullYear()}`
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>Data de validade</td>
                            <td class="text-end">
                              {{
                                `${String(
                                  new Date(item.expiration_date).getDate()
                                ).padStart(2, "0")}/${String(
                                  new Date(item.expiration_date).getMonth() + 1
                                ).padStart(2, "0")}/${new Date(
                                  item.expiration_date
                                ).getFullYear()}`
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="col">
                    <h5>
                      <font-awesome-icon :icon="['fa', 'location-dot']" />&nbsp;
                      Morada
                    </h5>
                    <div class="ms-3">
                      <div
                        class="card mt-3 mb-3 map-size"
                        style="width: 550px; height: 250px"
                      >
                        <div
                          class="card-img-top itemMap"
                          :id="'item-' + item.id"
                        ></div>
                        <div class="card-body">
                          <div class="card-text">
                            <small>
                              {{ item.warehouse.address.city }},
                              {{ item.warehouse.address.country }}<br />
                              {{ item.warehouse.address.street }}<br />
                              {{ item.warehouse.address.postal_code }}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal New Item -->
      <div
        class="modal fade"
        id="modalNewItem"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="modalNewItemLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalNewItemLabel">
                Novo fornecimento
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-4">
              <form @submit.prevent="newItem">
                <div class="row mb-2">
                  <div class="col mb-3">
                    <label for="newItemCenter" class="form-label"
                      >Armazém <span style="color: #ff0000">*</span></label
                    ><br />
                    <div
                      v-if="!this.selectedWarehouseNew.capacity"
                      class="mb-3 ms-3"
                    >
                      <small>Ainda não selecionou nenhum armazém.</small><br />
                      <small
                        >Por favor selecione um armazém a partir do conjunto de
                        armazéns associados ao seu perfil.</small
                      >
                    </div>
                    <div v-else>
                      <div
                        class="card mb-3 ms-2"
                        style="
                          width: 260px !important;
                          height: 150px !important ;
                          cursor: pointer;
                        "
                      >
                        <div class="card-body">
                          <address>
                            <strong
                              ><font-awesome-icon
                                :icon="['fa', 'warehouse']"
                              />&nbsp; Armazém #{{
                                this.selectedWarehouseNew.id
                              }}</strong
                            ><br />
                            {{ this.selectedWarehouseNew.address.street }}
                            <br />
                            {{ this.selectedWarehouseNew.address.city }},
                            {{ this.selectedWarehouseNew.address.country
                            }}<br />
                            <p class="mt-2">
                              Capacidade: {{ this.selectedWarehouseNew.capacity
                              }}<br />
                            </p>
                          </address>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#newItemWarehouse"
                      id="newCenterAddress"
                      v-on:click=""
                    >
                      <font-awesome-icon :icon="['fa', 'warehouse']" />&nbsp;
                      Armazéns disponíveis
                    </button>
                  </div>
                  <div class="col mb-3">
                    <label for="newItemProduct" class="form-label"
                      >Produto <span style="color: #ff0000">*</span></label
                    ><br />
                    <select
                      id="inputProduct"
                      name="inputProduct"
                      class="form-control"
                      v-model="newItemInfo.product"
                      required
                    >
                      <option
                        v-for="product in this.products"
                        :key="product.id"
                        :value="product.id"
                      >
                        {{ product.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col mb-3">
                    <label for="newItemQuantity" class="form-label"
                      >Quantidade <span style="color: #ff0000">*</span></label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="newItemQuantity"
                      v-model="newItemInfo.quantity"
                      placeholder="Quantidade"
                      required
                    />
                  </div>
                  <div class="col mb-3">
                    <label for="newItemPrice" class="form-label"
                      >Preço <span style="color: #ff0000">*</span></label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="newItemPrice"
                      v-model="newItemInfo.price"
                      placeholder="Preço"
                      required
                    />
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col mb-3">
                    <label for="newItemProductionDate" class="form-label"
                      >Data de produção
                      <span style="color: #ff0000">*</span></label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="newItemProductionDate"
                      v-model="newItemInfo.production_date"
                      required
                    />
                  </div>
                  <div class="col mb-3">
                    <label for="newExpirationDate" class="form-label"
                      >Data de validade
                      <span style="color: #ff0000">*</span></label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="newExpirationDate"
                      v-model="newItemInfo.expiration_date"
                      required
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    id="closeNewItemModal"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button
                    v-if="this.selectedWarehouseNew.address.street"
                    type="submit"
                    class="btn btn-primary"
                  >
                    Criar fornecimento
                  </button>
                  <button v-else type="submit" class="btn btn-primary" disabled>
                    Criar fornecimento
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal New Item Warehouse -->
      <div
        class="modal fade"
        id="newItemWarehouse"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="newItemWarehouseLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="newItemWarehouseLabel">
                Selecione o armazém
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div
                class="row justify-content-center"
                style="max-height: 500px; overflow-y: auto"
              >
                <div
                  v-if="calculateWarehousesLength() > 0"
                  v-for="warehouse in this.warehouses"
                  :key="warehouse.id"
                  class="card mt-3 mb-3"
                  style="width: 300px !important; cursor: pointer"
                >
                  <div
                    class="card-body"
                    v-on:click="this.selectedWarehouseNew = warehouse"
                    data-bs-toggle="modal"
                    data-bs-target="#modalNewItem"
                  >
                    <div>
                      <h5>
                        <font-awesome-icon :icon="['fa', 'warehouse']" />&nbsp;
                        Armazém #{{ warehouse.id }}
                      </h5>
                      <br />
                      <h6>
                        <font-awesome-icon
                          :icon="['fa', 'location-dot']"
                        />&nbsp; Morada
                      </h6>
                      <address>
                        {{ warehouse.address.street }}<br />
                        {{ warehouse.address.city }},
                        {{ warehouse.address.country }}<br />
                        <abbr title="CP">Código Postal:</abbr>
                        {{ warehouse.address.postal_code }}
                      </address>
                      <p class="mt-2">Capacidade: {{ warehouse.capacity }}m²</p>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center mt-3 mb-3">
                  <p>
                    Parece que não tem armazéns associados à sua conta. Adicione
                    um!
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#modalNewItem"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br /><br /><br />
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTruck,
  faGasPump,
  faOilCan,
  faChargingStation,
  faBolt,
  faSkullCrossbones,
  faBox,
  faPlus,
  faUpRightAndDownLeftFromCenter,
  faTrash,
  faLeaf,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faTruck,
  faGasPump,
  faOilCan,
  faChargingStation,
  faBolt,
  faSkullCrossbones,
  faBox,
  faPlus,
  faUpRightAndDownLeftFromCenter,
  faTrash,
  faLeaf,
  faTag
);

import http from "../../../http-common";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "Vehicles",
  mounted() {
    this.getUserInfo();
    this.getUserInventory();
    this.getUserWarehouses();
    this.getProducts();
  },
  data() {
    const toast = useToast();
    return {
      toast,
      user: {},
      inventory: [],
      inventoryLength: 1,
      selectedItem: {
        warehouse: { address: {} },
        total_vehicles: "",
        capacity: "",
      },
      map: {},
      newItemInfo: {
        distribution_center: "",
        license_plate: "",
        payload_capacity: "",
        resource_usage: "",
        average_emissions: "",
        fuel_type: "",
      },
      warehouses: [],
      selectedWarehouseNew: { capacity: "", address: {} },
      products: {},
      selectedProductNew: { id: "" },
    };
  },
  methods: {
    initMaps() {
      const loader = new Loader({
        apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
        version: "weekly",
      });
      loader.load().then(() => {
        for (let item of this.inventory) {
          let position = {
            lat: item.warehouse.address.latitude,
            lng: item.warehouse.address.longitude,
          };
          let itemMap = new google.maps.Map(
            document.getElementById("item-" + item.id),
            {
              center: position,
              zoom: 15,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              zoomControl: false,
              disableDoubleClickZoom: true,
              draggable: false,
              disableDefaultUI: true,
              clickableIcons: false,
            }
          );

          const marker = new google.maps.Marker({
            position: position,
            map: itemMap,
            label: {
              text: " ",
              color: "#FFF",
            },
          });
        }
      });
    },
    getUserInfo() {
      this.user = this.$store.getters.getUser;
      return this.user;
    },
    getUserInventory() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (accessToken && userId) {
        http
          .get(`/supplier/${userId}/inventory`, headers)
          .then((response) => {
            if (response.status == 200) {
              this.inventory = response.data;
              this.calculateInventoryLength();
              this.initMaps();
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            console.log("Failure!");
          });
      }
    },
    calculateInventoryLength() {
      this.inventoryLength = Object.keys(this.inventory).length;
      return this.inventoryLength;
    },
    getUserWarehouses() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (accessToken && userId) {
        http
          .get(`/supplier/${userId}/warehouses`, headers)
          .then((response) => {
            if (response.status == 200) {
              this.warehouses = response.data;
              this.calculateWarehousesLength();
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("Failure!");
          });
      }
    },
    calculateWarehousesLength() {
      return Object.keys(this.warehouses).length;
    },
    getProducts() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      if (accessToken && userId) {
        http
          .get(`/store/products?include_unbuyable=true`)
          .then((response) => {
            if (response.status == 200) {
              this.products = response.data.products;
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("Failure!");
          });
      }
    },
    successfulToast(message) {
      this.toast.success(message, {
        position: "top-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
    errorToast(message) {
      this.toast.error(message, {
        position: "top-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
    successfulNewItem() {
      this.getUserInventory();
      var closeEditModal = document.getElementById("closeNewItemModal");
      closeEditModal.click();
      this.successfulToast("Criado! O fornecimento foi criado com sucesso.");
    },
    errorNewItem() {
      this.errorToast("Este produto já está a ser vendido neste armazém.");
    },
    newItem() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      let datetime1 = new Date(this.newItemInfo.production_date);
      let datetime2 = new Date(this.newItemInfo.expiration_date);
      http
        .post(
          `/supplier/${userId}/inventory`,
          JSON.stringify({
            product: this.newItemInfo.product,
            warehouse: this.selectedWarehouseNew.id,
            quantity: this.newItemInfo.quantity,
            price: this.newItemInfo.price,
            production_date: datetime1.toISOString(),
            expiration_date: datetime2.toISOString(),
          }),
          headers
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.successfulNewItem();
          }
        })
        .catch((error) => {
          if (error.message == "Request failed with status code 409") {
            this.errorNewItem();
          }
        });
    },
    removeItem(item) {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (accessToken && userId) {
        http
          .delete(`/supplier/${userId}/inventory/${item}`, headers)
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              this.successfulRemoveItem();
            }
          })
          .catch((error) => {
            console.log(error);
            //}
          });
      }
    },
  },
};
</script>

<style scoped>
.itemMap {
  height: 210px;
  width: 100%;
  border-radius: 5px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.card:hover {
  box-shadow: 1px 10px 12px #d9d9d9;
}
.btn-primary {
  background-color: #5e9f88;
  border-color: white;
}
:focus {
  outline: 0 !important;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
}
.form-control {
  appearance: auto !important;
}
.footerOverride {
  bottom: auto !important;
}
.content-container {
  display: flex;
  flex-direction: row;
}
.accordion-button:not(.collapsed) {
  color: black;
  background-color: white;
}

@media (min-width: 992px) and (max-width: 1199px) {
  .content-container {
    display: flex;
    flex-direction: column;
  }
  .btn-add {
    width: 50% !important;
  }
  .map-size {
    width: 95% !important;
  }
}

@media (max-width: 991px) {
  .content-container {
    display: flex;
    flex-direction: column;
  }
  .btn-add {
    width: 50% !important;
  }
  .map-size {
    width: 95% !important;
  }
}
</style>
