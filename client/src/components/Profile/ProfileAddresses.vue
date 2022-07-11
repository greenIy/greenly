<template>
<div class="my-5">
  <h4>Moradas</h4>
  <hr />
  <i v-if="addressesLength() == 0"
    >Parece que não tem nenhuma morada associada à sua conta.<br />Adicione uma
    clicando no botão abaixo.<br
  /></i>

  <div v-else>
    <i>Pode adicionar mais do que uma morada à sua conta Greenly.</i>
    <br />
    <i
      >Deve definir uma morada de entrega &nbsp;<font-awesome-icon
        :icon="['fa', 'truck']"
        style="color: #e3c12b"
      />&nbsp; e uma morada de faturação &nbsp;<font-awesome-icon
        :icon="['fa', 'money-check-dollar']"
        size="lg"
        style="color: #5e9f88"
      />&nbsp;.</i
    >
  </div>
  <br />

  <!-- Button trigger modal New Address -->
  <button
    type="button"
    class="btn btn-secondary"
    data-bs-toggle="modal"
    data-bs-target="#newAddress"
  >
    <font-awesome-icon :icon="['fa', 'plus']" /> &nbsp;Adicionar morada
  </button>

  <br />
  <br />
  <div style="overflow-y: auto; overflow-x: hidden; height: 300px">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        v-for="address in this.user.addresses"
        :key="address.nif"
        class="card card-ajust"
      >
        <div class="card-body">
          <address>
            <div class="position-absolute top-0 end-0 p-2 pe-3">
              <font-awesome-icon
                v-if="address.is_shipping === true"
                style="cursor: pointer; color: #e3c12b; margin-right: 5px"
                :icon="['fa', 'truck']"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Morada de entrega atual"
                v-on:click="addressAlreadySet('shipping')"
              />
              <font-awesome-icon
                v-else
                id="addressButtons"
                style="cursor: pointer; color: #a3a2a0; margin-right: 5px"
                :icon="['fa', 'truck']"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Definir como morada de entrega"
                v-on:click="
                  selectAddress(address);
                  setAsShippingAddress();
                "
              />
              <font-awesome-icon
                v-if="address.is_billing === true"
                style="cursor: pointer; color: #5e9f88"
                :icon="['fa', 'money-check-dollar']"
                size="lg"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Morada de faturação atual"
                v-on:click="addressAlreadySet('billing')"
              />
              <font-awesome-icon
                v-else
                id="addressButtons"
                style="cursor: pointer; color: #a3a2a0"
                :icon="['fa', 'money-check-dollar']"
                size="lg"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Definir como morada de faturação"
                v-on:click="
                  selectAddress(address);
                  setAsBillingAddress();
                "
              />
            </div>
            <strong
              ><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp;
              {{ address.city }}</strong
            ><br />
            {{ address.street }}<br />
            {{ address.city }}, {{ address.country }}<br />
            <abbr title="CP">Código Postal:</abbr> {{ address.postal_code }}
          </address>
          <address>
            <strong>NIF</strong><br />
            <a>{{ address.nif }}</a>
            <div class="position-absolute bottom-0 end-0 p-2 pe-3">
              <a
                id="viewMapButton"
                data-bs-toggle="modal"
                data-bs-target="#viewMapModal"
                v-on:click="selectAddress(address)"
                ><font-awesome-icon
                  style="cursor: pointer"
                  :icon="['fa', 'map-location-dot']"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Ver no mapa" /></a
              >&nbsp;
              <a
                id="editAddressButton"
                data-bs-toggle="modal"
                data-bs-target="#editAddressModal"
                v-on:click="selectAddress(address)"
                ><font-awesome-icon
                  style="cursor: pointer"
                  :icon="['fa', 'pen']"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Editar morada" /></a
              >&nbsp;
              <a
                id="removeAddressButton"
                data-bs-toggle="modal"
                data-bs-target="#removeAddress"
                v-on:click="selectAddress(address)"
                ><font-awesome-icon
                  style="cursor: pointer"
                  :icon="['fa', 'trash-can']"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Remover morada"
              /></a>
            </div>
          </address>
        </div>
      </div>
    </div>
  </div>
  <br />

  <!-- Modal New Address -->
  <div
    class="modal fade"
    id="newAddress"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="newAddressLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newAddressLabel">Adicionar morada</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="newAddress">
            <div class="col mb-3">
              <label for="selectCountry" class="form-label"
                >País <span style="color: #ff0000">*</span></label
              >
              <country-select
                class="form-control"
                id="newAddressCountry"
                v-model="newAddressInfo.country"
                :country="country"
                topCountry=""
                :countryName="true"
                required
              />
            </div>
            <div class="col mb-3">
              <label for="newAddressCity" class="form-label"
                >Cidade <span style="color: #ff0000">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="newAddressCity"
                v-model="newAddressInfo.city"
                placeholder="Cidade"
                required
              />
            </div>
            <div class="col mb-3">
              <label for="newAddressStreet" class="form-label"
                >Rua <span style="color: #ff0000">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="newAddressStreet"
                v-model="newAddressInfo.street"
                placeholder="Rua"
                maxlength="40"
                required
              />
            </div>
            <div class="row">
              <div class="col mb-3">
                <label for="newAddressPostalCode" class="form-label"
                  >Código-postal <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="newAddressPostalCode"
                  v-model="newAddressInfo.postalCode"
                  placeholder="Código Postal"
                  required
                />
              </div>
              <div class="col mb-3">
                <label for="newAddressNIF" class="form-label"
                  >NIF <span style="color: #ff0000">*</span></label
                >
                <input
                  type="number"
                  class="form-control"
                  id="newAddressNIF"
                  v-model="newAddressInfo.nif"
                  v-on:click="removeIsInvalid"
                  placeholder="NIF"
                  required
                />
                <div class="invalid-feedback" id="invalidFeedbackNewNIF">
                  Deve conter exatamente 9 algarismos.
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                id="closeNewModalButton"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                v-on:click="removeIsInvalid"
              >
                <font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                id="newAddressButton"
              >
                <font-awesome-icon :icon="['fa', 'plus']" /> &nbsp;Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal View Map -->
  <div
    class="modal fade"
    id="viewMapModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="viewMapLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="viewMapLabel">Mapa</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div :id="'map' + this.selectedAddress.id" class="map"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Edit Address -->
  <div
    class="modal fade"
    id="editAddressModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="editAddressLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editAddressLabel">Editar morada</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editAddress">
            <div class="col mb-3">
              <label for="selectCountry" class="form-label"
                >País <span style="color: #ff0000">*</span></label
              >
              <country-select
                class="form-control"
                id="editAddressCountry"
                v-bind:value="this.selectedAddress.country"
                :country="this.selectedAddress.country"
                topCountry=""
                :countryName="true"
                required
              />
            </div>
            <div class="col mb-3">
              <label for="addressCity" class="form-label"
                >Cidade <span style="color: #ff0000">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="editAddressCity"
                v-bind:value="this.selectedAddress.city"
                required
              />
            </div>
            <div class="col mb-3">
              <label for="addressStreet" class="form-label"
                >Rua <span style="color: #ff0000">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="editAddressStreet"
                v-bind:value="this.selectedAddress.street"
                maxlength="40"
                required
              />
            </div>
            <div class="row">
              <div class="col mb-3">
                <label for="addressPostalCode" class="form-label"
                  >Código-postal <span style="color: #ff0000">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="editAddressPostalCode"
                  v-bind:value="this.selectedAddress.postal_code"
                  required
                />
              </div>
              <div class="col mb-3">
                <label for="addressNIF" class="form-label"
                  >NIF <span style="color: #ff0000">*</span></label
                >
                <input
                  type="number"
                  class="form-control"
                  id="editAddressNIF"
                  v-bind:value="this.selectedAddress.nif"
                  v-on:click="removeIsInvalid"
                  required
                />
                <div class="invalid-feedback" id="invalidFeedbackEditNIF">
                  Deve conter exatamente 9 algarismos.
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                id="closeEditModalButton"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                v-on:click="removeIsInvalid"
              >
                <font-awesome-icon :icon="['fa', 'xmark']" /> &nbsp;Cancelar
              </button>
              <button type="submit" class="btn btn-primary">
                <font-awesome-icon :icon="['fa', 'floppy-disk']" />
                &nbsp;Guardar alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Remove Address -->
  <div
    class="modal fade"
    id="removeAddress"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="removeAddressLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="removeAddressLabel">Atenção!</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Tem a certeza que deseja remover esta morada do seu perfil?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            id="closeRemoveModalButton"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="btn btn-danger"
            v-on:click="removeAddress"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { useToast } from "vue-toastification";
import { library } from "@fortawesome/fontawesome-svg-core";
import {} from "@fortawesome/free-brands-svg-icons";
import {
  faPlus,
  faXmark,
  faFloppyDisk,
  faTrashCan,
  faPen,
  faMapLocationDot,
  faHouseChimney,
  faMoneyCheckDollar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faPlus,
  faXmark,
  faFloppyDisk,
  faTrashCan,
  faPen,
  faMapLocationDot,
  faHouseChimney,
  faMoneyCheckDollar,
  faTruck
);

import http from "../../../http-common";
import AuthService from "../../router/auth";
import countrySelect from "@/components/Profile/Country-select";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "ProfileAddresses",
  components: {
    countrySelect,
  },
  mounted() {
    this.getUserInfo();
  },
  data() {
    const toast = useToast();
    return {
      toast,
      user: {},
      newAddressInfo: {
        country: "",
        city: "",
        street: "",
        postalCode: "",
        nif: "",
      },
      selectedAddress: "",
    };
  },
  created() {
    this.changeTitle();
  },
  methods: {
    changeTitle() {
      window.document.title = "Greenly | Moradas";
    },
    initMaps() {
      const loader = new Loader({
        apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
        version: "weekly",
      });

      loader.load().then(() => {
        let position = {
          lat: this.selectedAddress.latitude,
          lng: this.selectedAddress.longitude,
        };
        let map = new google.maps.Map(
          document.getElementById("map" + this.selectedAddress.id),
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
          animation: google.maps.Animation.BOUNCE,
          map: map,
          label: {
            text: " ",
            color: "#FFF",
          },
        });
      });
    },
    getUserInfo() {
      this.user = this.$store.getters.getUser;
      return this.user;
    },
    addressesLength() {
      var user = this.getUserInfo();
      var size = Object.keys(user.addresses).length;
      return size;
    },
    selectAddress(address) {
      this.selectedAddress = address;
      this.initMaps();
    },
    wrongCredentials(action, param) {
      if (action == "new" && param == "nif") {
        document.getElementById("newAddressNIF").classList.add("is-invalid");
      } else if (action == "edit" && param == "nif") {
        document.getElementById("editAddressNIF").classList.add("is-invalid");
      }
    },
    successfulToast(message) {
      this.toast.success(message, {
        toastClassName: "my-custom-toast-class",
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
    warningToast(message) {
      this.toast.warning(message, {
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
    successfulNewAddress() {
      this.newAddressInfo.street = "";
      this.newAddressInfo.city = "";
      this.newAddressInfo.postalCode = "";
      document.getElementById("newAddressCountry").value = "";
      document.getElementById("newAddressCountry").placeholder =
        "Selecione país";
      this.newAddressInfo.nif = "";
      var closeEditModal = document.getElementById("closeNewModalButton");
      closeEditModal.click();
      this.successfulToast(
        "Adicionada! A sua morada foi adicionada com sucesso."
      );
    },
    successfulEditAddress() {
      var closeEditModal = document.getElementById("closeEditModalButton");
      closeEditModal.click();
      this.successfulToast(
        "Atualizada! A sua morada foi atualizada com sucesso."
      );
    },
    successfulSetShippingAddress() {
      this.successfulToast(
        "Definida! A sua morada de entrega foi definida com sucesso."
      );
    },
    successfulSetBillingAddress() {
      this.successfulToast(
        "Definida! A sua morada de faturação foi definida com sucesso."
      );
    },
    addressAlreadySet(addressType) {
      if (addressType == "shipping") {
        this.warningToast(
          "Oops! Esta morada já se encontra definida como a sua morada de entrega."
        );
      } else if (addressType == "billing") {
        this.warningToast(
          "Oops! Esta morada já se encontra definida como a sua morada de faturação."
        );
      }
    },
    successfulRemoveAddress() {
      var closeEditModal = document.getElementById("closeRemoveModalButton");
      closeEditModal.click();
      this.successfulToast("Removida! A sua morada foi removida com sucesso.");
    },
    addressHasOrders() {
      var closeEditModal = document.getElementById("closeRemoveModalButton");
      closeEditModal.click();
      if (this.user.type == "CONSUMER") {
        this.errorToast(
          "Oops! A sua morada está associada a encomendas em progresso, logo não pode ser apagada."
        );
      } else if (this.user.type == "SUPPLIER") {
        this.errorToast(
          "Oops! A sua morada está associada a armazéns existentes, logo não pode ser apagada."
        );
      } else if (this.user.type == "TRANSPORTER") {
        this.errorToast(
          "Oops! A sua morada está associada a centros de distribuição existentes, logo não pode ser apagada."
        );
      }
    },
    newAddress() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (accessToken && userId) {
        this.newAddressInfo.country =
          document.getElementById("newAddressCountry").value;
        http
          .post(
            `/user/${userId}/addresses`,
            JSON.stringify({
              street: this.newAddressInfo.street,
              city: this.newAddressInfo.city,
              postal_code: this.newAddressInfo.postalCode,
              country: this.newAddressInfo.country,
              nif: Number(this.newAddressInfo.nif),
            }),
            headers
          )
          .then((response) => {
            if (response.status == 201) {
              AuthService.getUser().then((result) => {
                this.user.addresses = result.addresses;
              });
              this.successfulNewAddress();
              console.log("Success!");
            }
          })
          .catch((error) =>
            this.wrongCredentials("new", error.response.data.errors[0].param)
          );
      }
    },
    editAddress() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      let addressId = this.selectedAddress.id;
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      var newCountry = document.getElementById("editAddressCountry").value;
      var newCity = document.getElementById("editAddressCity").value;
      var newStreet = document.getElementById("editAddressStreet").value;
      var newPostalCode = document.getElementById(
        "editAddressPostalCode"
      ).value;
      var newNif = document.getElementById("editAddressNIF").value;
      if (accessToken && userId) {
        http
          .put(
            `/user/${userId}/addresses/${addressId}`,
            JSON.stringify({
              street: newStreet,
              city: newCity,
              country: newCountry,
              postal_code: newPostalCode,
              nif: Number(newNif),
            }),
            headers
          )
          .then((response) => {
            if (response.status == 200) {
              this.selectedAddress.country = newCountry;
              this.selectedAddress.city = newCity;
              this.selectedAddress.street = newStreet;
              this.selectedAddress.postal_code = newPostalCode;
              this.selectedAddress.nif = newNif;
              this.successfulEditAddress();
              console.log("Success!");
            }
          })
          .catch((error) =>
            this.wrongCredentials("edit", error.response.data.errors[0].param)
          );
      }
    },
    setAsShippingAddress() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      let addressId = this.selectedAddress.id;
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (accessToken && userId) {
        http
          .put(
            `/user/${userId}/addresses/${addressId}`,
            JSON.stringify({ is_shipping: true }),
            headers
          )
          .then((response) => {
            if (response.status == 200) {
              AuthService.getUser().then((result) => {
                this.user.addresses = result.addresses;
              });
              this.successfulSetShippingAddress();
              console.log("Success!");
            }
          })
          .catch((error) => this.wrongCredentials("edit", error.response.data));
      }
    },
    setAsBillingAddress() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      let addressId = this.selectedAddress.id;
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (accessToken && userId) {
        http
          .put(
            `/user/${userId}/addresses/${addressId}`,
            JSON.stringify({ is_billing: true }),
            headers
          )
          .then((response) => {
            if (response.status == 200) {
              AuthService.getUser().then((result) => {
                this.user.addresses = result.addresses;
              });
              this.successfulSetBillingAddress();
              console.log("Success!");
            }
          })
          .catch((error) => this.wrongCredentials("edit", error.response.data));
      }
    },
    removeAddress() {
      let accessToken = JSON.parse(localStorage.getItem("accessToken"));
      let userId = JSON.parse(localStorage.getItem("userId"));
      let addressId = this.selectedAddress.id;
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (accessToken && userId) {
        http
          .delete(`/user/${userId}/addresses/${addressId}`, headers)
          .then((response) => {
            if (response.status == 202) {
              AuthService.getUser().then((result) => {
                this.user.addresses = result.addresses;
              });
              this.successfulRemoveAddress();
              console.log("Success!");
            }
          })
          .catch((error) => {
            if (error.response.data.message == "Address not found.") {
              this.addressHasOrders();
            } else {
              console.log(error.response);
            }
          });
      }
    },
    removeIsInvalid() {
      document.getElementById("newAddressNIF").classList.remove("is-invalid");
      document.getElementById("editAddressNIF").classList.remove("is-invalid");
    },
  },
};
</script>

<style scoped>
.map {
  height: 500px;
  width: 100%;
  display: inline-block;
}
.btn-primary {
  background-color: #5e9f88;
  border-color: white;
}
.modal-footer {
  border-width: 0;
}
#addressButtons {
  opacity: 0.6;
}
#addressButtons:hover {
  opacity: 1;
  transform: scale(1.05);
}
#removeAddressButton:hover {
  color: #d21d1d;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.card:hover {
  box-shadow: 1px 10px 12px #d9d9d9;
}
::-webkit-scrollbar {
  width: 17px;
}
::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}
::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 5px solid transparent;
  background-clip: content-box;
  background-color: #5e9f88;
}
:focus {
  outline: 0 !important;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
}
.card-ajust{
  margin-right: 30px;
  margin-left: 12px
}
@media (min-width: 992px) and (max-width: 1199px) {
  .card-ajust{
  margin-right: 0!important;
  margin-left: 0!important;
}
}

@media (max-width: 991px) {
  .card-ajust{
  margin-right: 0!important;
  margin-left: 0!important;
}
}
</style>
