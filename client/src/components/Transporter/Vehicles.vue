<template>
    
	<div class="container mt-5">
		<div class="row align-items-start">
            <div class="row align-items-start">
                <div class="row">
                    <div class="col">
                        <div class="card" style="height: 180px;">
                            <div class="card-body text-center">
                                <h5 class="card-title"><font-awesome-icon :icon="['fa', 'truck']" />&nbsp; Veículos</h5>
                                <hr>
                                <div class="row align-items-start">
                                    <div class="col">
                                        <span class="card-text fs-1">{{ calculateVehicleTypeLength("PETROL") }}&nbsp;<font-awesome-icon :icon="['fa', 'gas-pump']" size="2xs" /></span>
                                        <span>gasolina</span>
                                    </div>
                                    <div class="col">
                                        <span class="card-text fs-1">{{ calculateVehicleTypeLength("DIESEL") }}&nbsp;<font-awesome-icon :icon="['fa', 'oil-can']" size="2xs" /></span>
                                        <span>gasóleo</span>
                                    </div>
                                    <div class="col">
                                        <span class="card-text fs-1">{{ calculateVehicleTypeLength("ELECTRICITY") }}&nbsp;<font-awesome-icon :icon="['fa', 'charging-station']" size="2xs" /></span>
                                        <span>eletricidade</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="col">
                        <div class="card" style="height: 180px;">
                            <div class="card-body text-center">
                                <h5 class="card-title"><font-awesome-icon :icon="['fa', 'bolt']" />&nbsp; Recursos</h5>
                                <hr>
                                <span class="card-text fs-1">{{ this.averageFleetResources.toFixed(2) }}</span> l/100Km<br>
                                <span>total de recursos usados</span>
                            </div>
                        </div>
                    </div>
                     <div class="col">
                        <div class="card" style="height: 180px;">
                            <div class="card-body text-center">
                                <h5 class="card-title"><font-awesome-icon :icon="['fa', 'skull-crossbones']" />&nbsp; Emissões</h5>
                                <hr>
                                <span class="card-text fs-1">{{ this.averageFleetEmissions.toFixed(2) }}</span>  CO₂ g/km/t<br>
                                <span>média de emissões</span>
                            </div>
                        </div>
                    </div>
                     <div class="col">
                        <div class="card" style="height: 180px;">
                            <div class="card-body text-center">
                                <h5 class="card-title"><font-awesome-icon :icon="['fa', 'box']" />&nbsp; Encomendas</h5>
                                <hr>
                                <span class="card-text fs-1">{{ calculateTotalOrders() }}</span><br>
                                <span>total de encomendas</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="d-flex align-items-center">
                        <button type="button" class="btn btn-secondary ms-3" data-bs-toggle="modal" data-bs-target="#modalNewVehicle" v-on:click=""><font-awesome-icon :icon="['fa', 'plus']" />&nbsp; Adicionar veículo</button>&nbsp;  &nbsp;  &nbsp;
                        <span class="fs-5"><font-awesome-icon :icon="['fa', 'bolt']" />&nbsp;  recursos usados<br></span>&nbsp;  &nbsp;  &nbsp;
                        <span class="fs-5"><font-awesome-icon :icon="['fa', 'skull-crossbones']" />&nbsp;  média de emissões<br></span>&nbsp;  &nbsp;  &nbsp;
                        <span class="fs-5"><font-awesome-icon :icon="['fa', 'box']" />&nbsp;  total de encomendass<br></span>
                    </div>
                </div>
                <div class="row mt-4">
                    <div v-for="(vehicle, index) in this.vehicles" :key="vehicle.id" class="card mb-3 ms-4 me-3" style="max-width: 30%; height: 270px !important;">
                        <div class="row g-0">
                            <div class="col-md-4 mt-5 ms-4 me-2">
                                <img id="vehicleTruck" src="../../assets/centerTruck.png">
                                <br>
                                <p class="licensePlate">{{ vehicle.license_plate }}</p>
                            </div>
                            <div class="col">
                                <div class="card-body">
                                    <span class="fs-5">Veículo #{{ vehicle.id }}<br></span>
                                    <hr>
                                    <span v-if=" vehicle.fuel_type === 'PETROL'"><font-awesome-icon :icon="['fa', 'gas-pump']" />&nbsp; Gasolina<br></span>
                                    <span v-if=" vehicle.fuel_type === 'DIESEL'"><font-awesome-icon :icon="['fa', 'oil-can']" />&nbsp; Gasóleo<br></span>
                                    <span v-if=" vehicle.fuel_type === 'ELECTRICITY'"><font-awesome-icon :icon="['fa', 'charging-station']" />&nbsp; Eletricidade<br></span>
                                    <span><font-awesome-icon :icon="['fa', 'bolt']" />&nbsp; {{ vehicle.resource_usage }} l/100Km<br></span>
                                    <span><font-awesome-icon :icon="['fa', 'skull-crossbones']" />&nbsp; {{ vehicle.average_emissions }} CO₂ g/km/t<br></span>
                                    <span><font-awesome-icon :icon="['fa', 'box']" />&nbsp; {{ vehicle.total_orders_assigned }} encomendas<br></span>                                
                                </div>
                            </div>
                            <hr>
                            <div class="text-center mt-1">
                                <button type="button" class="btn btn-secondary btn-sm me-3" data-bs-toggle="modal" data-bs-target="#modalDetailsVehicle" v-on:click=""><font-awesome-icon :icon="['fa', 'up-right-and-down-left-from-center']" />&nbsp; Mais detalhes</button>
                                <button type="button" class="btn btn-danger btn-sm" v-on:click=""><font-awesome-icon :icon="['fa', 'trash']" />&nbsp; Remover</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal New Vehicle -->
            <div class="modal fade" id="modalNewVehicle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalNewVehicleLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalNewVehicleLabel">Adicionar veículo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="newVehicle">
                    <label for="newVehicleFuelType" class="form-label">Combustível <span style='color: #FF0000;'>*</span></label><br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="fuelTypePetrol" value="PETROL">
                        <label class="form-check-label" for="inlineRadio1">Gasolina</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="fuelTypeDiesel" value="DIESEL">
                        <label class="form-check-label" for="inlineRadio2">Gasóleo</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="fuelTypeElectricity" value="ELECTRICITY">
                        <label class="form-check-label" for="inlineRadio3">Eletricidade</label>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="newVehicleCenter" class="form-label">Centro de distribuição <span style='color: #FF0000;'>*</span></label><br>
                            <button type="button" class="btn btn-secondary me-3" data-bs-toggle="modal" data-bs-target="#detailsVehicleModal" id="newVehicleCenter" v-on:click=""><font-awesome-icon :icon="['fa', 'building-circle-arrow-right']" />&nbsp; Escolher</button>
                        </div>
                        <div class="col mb-3">
                            <label for="newVehicleLicense" class="form-label">Matrícula <span style='color: #FF0000;'>*</span></label>
                            <input type="text" class="form-control" id="newVehicleLicense" v-model="newVehicleInfo.license_plate" placeholder="Matrícula" minlength="6" maxlength="6" required v-on:click="removeIsInvalid">
                            <div class="invalid-feedback" id="invalidFeedbackNewNIF">Esta matrícula já se encontra atribuída.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="newVehicleCapacity" class="form-label">Capacidade de carga <span style='color: #FF0000;'>*</span></label>
                            <input type="text" class="form-control" id="newVehicleCapacity" v-model="newVehicleInfo.payload_capacity" placeholder="Capacidade de carga" required>
                        </div>
                        <div class="col mb-3">
                            <label for="newVehicleResources" class="form-label">Recursos necessários <span style='color: #FF0000;'>*</span></label>
                            <input type="text" class="form-control" id="newVehicleResources" v-model="newVehicleInfo.resource_usage" placeholder="Recursos necessários" required>
                        </div>
                        <div class="col mb-3">
                            <label for="newVehicleEmissions" class="form-label">Emissões médias <span style='color: #FF0000;'>*</span></label>
                            <input type="text" class="form-control" id="newVehicleEmissions" v-model="newVehicleInfo.average_emissions" placeholder="Emissões médias" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeNewVehicleModal" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Adicionar</button>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal Details Vehicle -->
            <div class="modal fade" id="modalDetailsVehicle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalDetailsVehicleLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDetailsVehicleLabel">Adicionar veículo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Concluído</button>
                </div>
                </div>
            </div>
            </div>
		</div>
	</div>
		
</template>

<script>

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTruck, faGasPump, faOilCan, faChargingStation, faBolt, faSkullCrossbones, faBox, faPlus, faUpRightAndDownLeftFromCenter, faTrash, faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
library.add(faTruck, faGasPump, faOilCan, faChargingStation, faBolt, faSkullCrossbones, faBox, faPlus, faUpRightAndDownLeftFromCenter, faTrash, faBuildingCircleArrowRight);

import http from "../../../http-common";
import { Loader } from "@googlemaps/js-api-loader"

export default {
	name: "Vehicles",
	mounted() {
        this.getUserInfo()
		this.getUserVehicles();
	},
	data() {
		return {
			user: {},
			vehicles: [],
			vehiclesLength: 1,
			selectedVehicle: {},
            averageFleetResources: 0,
            averageFleetEmissions: 0,
			map: {},
            newVehicleInfo: {
                distribution_center: '',
                license_plate: '',
                payload_capacity: '',
                resource_usage: '',
                average_emissions: '',
                fuel_type: '',
            },
		};
	},
	methods: {
		initCenterMap() {
            const loader = new Loader({
                apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
                version: "weekly"
            });
            loader.load().then(() => {
                let position = {lat: this.selectedVehicle.address.latitude, lng: this.selectedVehicle.address.longitude}
                let vehicleMap = new google.maps.Map(document.getElementById("vehicleMap"), {
                center: position,
                zoom: 12,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                zoomControl: false,
                disableDoubleClickZoom: true,
                draggable: false,
                disableDefaultUI: true,
                clickableIcons: false,
                })
				const marker = new google.maps.Marker({
                        position: position,
                        map: vehicleMap,
                        label: {
                            text: " ",
                            color: "#FFF"
                        }
                    }
                );
            })
        },
		getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.user
        },
        getUserVehicles() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.get(`/transporter/${userId}/vehicles`, headers)
                .then((response) => {
                    if (response.status == 200) {
                        console.log(response.data)
                        this.vehicles = response.data.vehicles;
                        this.averageFleetResources = response.data.average_fleet_resource_usage;
                        this.averageFleetEmissions = response.data.average_fleet_emissions;
						this.calculateVehiclesLength()
                    }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
        },
		calculateVehiclesLength() {
			this.vehiclesLength = Object.keys(this.vehicles).length;
			return this.vehiclesLength
		},
        calculateVehicleTypeLength(type) {
            let totalPetrol = 0
            let totalDiesel = 0
            let totalElectricity = 0
            for (let vehicle of this.vehicles) {
                if (vehicle.fuel_type === "PETROL") { totalPetrol += 1  } 
                else if (vehicle.fuel_type === "DIESEL") { totalDiesel += 1}
                else if (vehicle.fuel_type === "ELECTRICITY") { totalElectricity += 1} 
            }
            if (type === "PETROL") { return totalPetrol}
            else if (type === "DIESEL") { return totalDiesel}
            else if (type === "ELECTRICITY") { return totalElectricity}
        },
        calculateTotalOrders() {
            let totalOrders = 0;
            for (let vehicle of this.vehicles) {
                totalOrders += vehicle.total_orders_assigned
            }
            return totalOrders;
        },
        conflitSolver(message) {
            if (message == "Request failed with status code 409")
                document.getElementById("newVehicleLicense").classList.add("is-invalid");
        },  
        successfulNewVehicle() {
            this.getUserVehicles();
            var closeEditModal = document.getElementById("closeNewVehicleModal");
            closeEditModal.click();
        },
		newVehicle() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if(document.getElementById("fuelTypePetrol").checked) { this.newVehicleInfo.fuel_type = "PETROL" }
            else if(document.getElementById("fuelTypeDiesel").checked) { this.newVehicleInfo.fuel_type = "DIESEL" }
            else if(document.getElementById("fuelTypeElectricity").checked) { this.newVehicleInfo.fuel_type = "ELECTRICITY" }
            http.post(`/transporter/${userId}/vehicles`, JSON.stringify({
                distribution_center: 1,
                license_plate: this.newVehicleInfo.license_plate,
                payload_capacity: Number(this.newVehicleInfo.payload_capacity),
                resource_usage: Number(this.newVehicleInfo.resource_usage),
                average_emissions: Number(this.newVehicleInfo.average_emissions),
                fuel_type: this.newVehicleInfo.fuel_type,
            }), headers)
            .then((response) => {
                console.log(response)
                if (response.status == 201) {
                    this.successfulNewVehicle()
                    console.log(response)
                }
                }).catch((error) => {
                    this.conflitSolver(error.message);
                })
		},
		removeVehicle() {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId) {
                http.delete(`/transporter/${userId}/vehicles/${2}`, headers)
                    .then((response) => {
                        if (response.status == 202) {
                            /* AuthService.getUser().then((result) => {
                                this.user.addresses = result.addresses;
                            });
                            this.successfulRemoveAddress()*/
                            console.log("Success!") 
                        }
                    }).catch(error => {
                        /* if (error.response.data.message == 'Address not found.') {
                            this.addressHasOrders()
                        } else { */
                            console.log(error.response)
                        //} 
                    }) 
            }
		},
        removeIsInvalid() {
            document.getElementById("newVehicleLicense").classList.remove("is-invalid");
        }
	}
			
};
</script>

<style scoped>
    #vehicleMap {
        height: 250px;
        width: 100%;
        display: inline-block;
		border-radius: 5px;
    }
	.card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
    .card:hover {
        box-shadow: 1px 10px 12px #d9d9d9;
    }
	.btn-primary{
        background-color: #5E9F88;
        border-color: white;
    }
	#vehicleTruck {
		width: 100px;
	}
	.licensePlate {
        width: 100px !important;
		background-color: white;
		text-align: center;
		font-weight: bold;
		font-size: 19px;
		border-radius: 5px;
		border: 1px solid #000;
		box-shadow: 1px 1px 1px #ddd;
		font-family: helvetica, ariel, sans-serif;
	}
</style>