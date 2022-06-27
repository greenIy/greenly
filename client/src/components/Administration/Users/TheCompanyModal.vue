<template>
        <!--Company-->
        <div class="modal fade" id="user-company" aria-hidden="true" aria-labelledby="user-company" tabindex="-1"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="user-company">Empresa de {{ this.currentUser.first_name }}
                            {{ this.currentUser.last_name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        oi 2
                    </div>
                    <div class="modal-footer">
                        <button class="btn bg-226d53 text-light btn-sm" data-bs-target="#user-details" data-bs-toggle="modal"
                            data-bs-dismiss="modal">Informações pessoais</button>
                        <button v-if="this.currentUser.type == 'CONSUMER'" class="btn bg-226d53 text-light btn-sm"
                            data-bs-target="#user-orders" data-bs-toggle="modal"
                            data-bs-dismiss="modal">Encomendas</button>
                        <button class="btn bg-226d53 text-light btn-sm" data-bs-target="#user-addresses" data-bs-toggle="modal"
                            data-bs-dismiss="modal">Moradas</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { Toast } from '../../../main';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
library.add(faPen, faFloppyDisk, faXmark);

import http from "../../../../http-common";
import AuthService from "../../../router/auth";

export default {
    name: 'ThePersonalInfoModal',
    components: {},
    data() {
        return {}
    },
    props: [
        'currentUser',
    ],
    methods: {
        editUserInfo() {
            document.getElementById("editInfoButton").style.display = "none";
            document.getElementById("cancelInfoButton").style.display = "block";
            document.getElementById("saveInfoButton").style.display = "block";

            document.getElementById("firstName").readOnly = false;
            document.getElementById("lastName").readOnly = false;
            document.getElementById("email").readOnly = false;
            document.getElementById("phoneNumber").readOnly = false;
        },
        cancelUserInfo() {
            document.getElementById("cancelInfoButton").style.display = "none";
            document.getElementById("saveInfoButton").style.display = "none";
            document.getElementById("editInfoButton").style.display = "block";
            
            document.getElementById("firstName").readOnly = true;
            document.getElementById("lastName").readOnly = true;
            document.getElementById("email").readOnly = true;
            document.getElementById("phoneNumber").readOnly = true;

            console.log("current user:");
            console.log(this.currentUser.id);
            console.log(JSON.parse(localStorage.getItem('userId')));

            AuthService.getTargetUser(this.currentUser.id).then((result) => {
                document.getElementById("firstName").value = result.first_name;
                document.getElementById("lastName").value = result.last_name;
                document.getElementById("email").value = result.email;
                document.getElementById("phoneNumber").value = result.phone;
            });

            this.removeIsInvalid();
        },
        wrongCredentials(message) {
            if (message == "E-mail already in use.") {
                document.getElementById("email").classList.add("is-invalid");
            }
        },
        saveUserInfo() {
            this.cancelUserInfo()
            var animation = {
                animation: true,
                delay: 5000
            };
            var successToast = document.getElementById("successToast");
            var successfulToast = new Toast(successToast, animation)
            successfulToast.show();

        },
        editProfile() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));

            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }

            var newFirstName = document.getElementById("firstName").value
            var newLastName = document.getElementById("lastName").value
            var newEmail = document.getElementById("email").value
            var newPhone = document.getElementById("phoneNumber").value

            if (accessToken && userId) {
                if (newEmail === this.currentUser.email) {
                    http.put(`/user/${this.currentUser.id}`,
                            JSON.stringify({
                                first_name: newFirstName,
                                last_name: newLastName,
                                phone: newPhone.toString(),
                            }), headers)
                        .then((response) => {
                            if (response.status == 200) {
                                this.currentUser.first_name = newFirstName;
                                this.currentUser.last_name = newLastName;
                                this.currentUser.phone = newPhone;
                                this.saveUserInfo()
                            }
                        }).catch((error) => {
                            console.log(error.response.data);
                            console.log("Failure!")
                        })
                } else {
                    http.put(`/user/${this.currentUser.id}`,
                            JSON.stringify({
                                first_name: newFirstName,
                                last_name: newLastName,
                                email: newEmail,
                                phone: newPhone.toString(),
                            }), headers)
                        .then((response) => {
                            if (response.status == 200) {
                                this.currentUser.first_name = newFirstName;
                                this.currentUser.last_name = newLastName;
                                this.currentUser.email = newEmail
                                this.currentUser.phone = newPhone;
                                this.saveUserInfo()
                            }
                        }).catch((error) => {
                            this.wrongCredentials(error.response.data.errors[0].msg);
                            console.log("Failure!")
                        })
                }
            }
        },
        removeIsInvalid() {
            document.getElementById("email").classList.remove("is-invalid");
        }
    },
}
</script>

<style scoped>
form {
    padding: 4.8em;
}

#successToast,
.bg-5e9f88{
        background-color: #5E9F88!important;
    }

.bg-226d53 {
    background-color: #226d53;
  }

.modal-footer {
    justify-content: center;
}
</style>