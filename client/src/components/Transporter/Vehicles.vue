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
                                <span>recursos usados</span>
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
                        <button type="button" class="btn btn-secondary ms-3" data-bs-toggle="modal" data-bs-target="#modalNewVehicle" style="width: 12%"><font-awesome-icon :icon="['fa', 'plus']" />&nbsp; Criar veículo</button>
                </div>
                <div v-if="calculateVehiclesLength() <= 0" class="text-center">
                    <p class="mt-5 fs-3">Parece que ainda não tem veículos.</p>
                </div>
                <div v-else class="row mt-4">
                    <div v-for="(vehicle, index) in this.vehicles" :key="vehicle.id" class="card mb-3 ms-3 me-3" style="max-width: 30%; height: 270px !important;">
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
                                <button type="button" class="btn btn-secondary btn-sm me-3" data-bs-toggle="modal" data-bs-target="#modalDetailsVehicle" v-on:click="selectVehicle(vehicle)"><font-awesome-icon :icon="['fa', 'up-right-and-down-left-from-center']" />&nbsp; Mais detalhes</button>
                                <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#removeVehicle" v-on:click="this.selectedVehicle = vehicle"><font-awesome-icon :icon="['fa', 'trash']" />&nbsp; Remover</button>
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
                    <h5 class="modal-title" id="modalNewVehicleLabel">Novo veículo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <form @submit.prevent="newVehicle">
                    <div class="mb-3">
                        <label for="newVehicleFuelType" class="form-label">Combustível <span style='color: #FF0000;'>*</span></label><br>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="fuelTypePetrol" value="PETROL" required>
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
                    </div>
                    <div class="row">
                        <div class="col mb-3">
                            <label for="newVehicleCenter" class="form-label">Centro de distribuição <span style='color: #FF0000;'>*</span></label><br>
                            <div v-if="!this.selectedCenterNew.capacity" class="mb-3 ms-3">
									<small>Ainda não selecionou nenhuma morada.</small><br>
									<small>Por favor selecione uma morada a partir do conjunto de moradas associadas ao seu perfil.</small>
								</div>
								<div v-else>
									<div class="card mb-3 ms-2" style="width: 260px !important; height: 135px !important ;cursor: pointer;">
										<div class="card-body">
											<address>
												<strong><font-awesome-icon :icon="['fa', 'building-circle-arrow-right']" />&nbsp; Centro #{{ this.selectedCenterNew.id  }}</strong><br>
                                                {{ this.selectedCenterNew.address.street }} <br>
												{{ this.selectedCenterNew.address.city  }}, {{ this.selectedCenterNew.address.country  }}<br>
												<p class="mt-2">Veículos: {{ this.selectedCenterNew.total_vehicles }}/{{ Math.floor(this.selectedCenterNew.capacity/36) }}<br></p>
											</address>
										</div>
									</div>  
								</div>
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newVehicleCenter" id="newCenterAddress" v-on:click=""><font-awesome-icon :icon="['fa', 'building-circle-arrow-right']" />&nbsp; Centros de distribuição disponíveis</button>
                        </div>
                        <div class="col mb-3">
                            <label for="newVehicleLicense" class="form-label">Matrícula <span style='color: #FF0000;'>*</span></label>
                            <input type="text" class="form-control" id="newVehicleLicense" v-model="newVehicleInfo.license_plate" placeholder="Matrícula" minlength="6" maxlength="6" required v-on:click="removeIsInvalid">
                            <div class="invalid-feedback" id="invalidFeedbackNewNIF">Esta matrícula já se encontra atribuída.</div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col mb-3">
                            <label for="newVehicleCapacity" class="form-label">Capacidade de carga <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="newVehicleCapacity" v-model="newVehicleInfo.payload_capacity" placeholder="Capacidade de carga" required>
                        </div>
                        <div class="col mb-3">
                            <label for="newVehicleResources" class="form-label">Recursos necessários <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="newVehicleResources" v-model="newVehicleInfo.resource_usage" placeholder="Recursos necessários" required>
                        </div>
                        <div class="col mb-3">
                            <label for="newVehicleEmissions" class="form-label">Emissões médias <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="newVehicleEmissions" v-model="newVehicleInfo.average_emissions" placeholder="Emissões médias" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeNewVehicleModal" data-bs-dismiss="modal">Cancelar</button>
                        <button v-if="this.selectedCenterNew.address.street" type="submit" class="btn btn-primary">Criar veículo</button>
                        <button v-else type="submit" class="btn btn-primary" disabled>Criar veículo</button>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal New Vehicle Center -->
            <div class="modal fade" id="newVehicleCenter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newVehicleCenterLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="newVehicleCenterLabel">Selecione o centro de distribuição</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row justify-content-center" style="max-height: 500px; overflow-y: auto;">
                        <div v-if="calculateDistributionCentersLength() > 0" v-for="center in this.distributionCenters" :key="center.id" class="card mt-3 mb-3" style="width: 300px !important; cursor: pointer;">
                            <div class="card-body" v-on:click="this.selectedCenterNew = center" data-bs-toggle="modal" data-bs-target="#modalNewVehicle">
                                <div>
                                    <h5><font-awesome-icon :icon="['fa', 'building-circle-arrow-right']" />&nbsp; Centro #{{ center.id }}</h5><br>
                                    <h6><font-awesome-icon :icon="['fa', 'location-dot']" />&nbsp; Morada</h6>
                                    <address>
                                        {{ center.address.street }}<br>
                                        {{ center.address.city }}, {{ center.address.country }}<br>
                                        <abbr title="CP">Código Postal:</abbr> {{ center.address.postal_code }}
								    </address>
                                    <p class="mt-2">Capacidade: {{ center.capacity }}m²</p>
                                </div>           
                            </div>
                        </div>
                        <div v-else class="text-center mt-3 mb-3">
                            <p>Parece que não tem centros de distribuição associados à sua conta. Adicione um!</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalNewVehicle">Voltar</button>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal Details Vehicle -->
            <div class="modal fade" id="modalDetailsVehicle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalDetailsVehicleLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDetailsVehicleLabel">Veículo #{{ this.selectedVehicle.id }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
							<div class="row align-items-start">
								<div class="col-8">
									<h5><font-awesome-icon :icon="['fa', 'truck']" size="sm"/>&nbsp; Detalhes veículo</h5>
                                    <table class="table mt-3 ms-2">
                                        <tbody>
                                            <tr>
                                                <td>Tipo de combustível</td>
                                                <td v-if=" this.selectedVehicle.fuel_type === 'PETROL'" class="text-end">Gasolina</td>
                                                <td v-if=" this.selectedVehicle.fuel_type === 'DIESEL'" class="text-end">Gasóleo</td>
                                                <td v-if=" this.selectedVehicle.fuel_type === 'ELECTRICITY'" class="text-end">Eletricidade</td>
                                            </tr>
                                            <tr>
                                                <td>Capacidade de carga</td>
                                                <td class="text-end">{{ this.selectedVehicle.payload_capacity }}kg</td>
                                            </tr>
                                            <tr>
                                                <td>Recursos usados</td>
                                                <td class="text-end">{{ this.selectedVehicle.resource_usage }} litros/100Km</td>
                                            </tr>
                                            <tr>
                                                <td>Média de emissões</td>
                                                <td class="text-end">{{ this.selectedVehicle.average_emissions }}CO₂ g/km/t</td>
                                            </tr>
                                        </tbody>
                                    </table>   
                                </div>     
                                <div class="col mt-5 ms-5 me-2">
                                    <img id="vehicleTruckInfo" src="../../assets/centerTruck.png">
                                    <br>
                                    <p class="licensePlateInfo">{{ this.selectedVehicle.license_plate }}</p>
								</div>
                                <div class="text-center">
                                    <button type="button" class="btn btn-secondary btn-sm mt-2" data-bs-toggle="modal" data-bs-target="#chooseAddressModal"><font-awesome-icon :icon="['fa', 'pencil']" size="sm"/>&nbsp; Editar detalhes</button>
                                </div>
                                <div class="row d-flex mt-3">
                                    <div class="col text-center">
                                        <span class="fs-4">{{ this.selectedVehicle.orders_in_transit }}</span><br>
                                        <span>encomendas em progresso</span>
                                    </div>
                                    <div class="col text-center">
                                        <span class="fs-4">{{ this.selectedVehicle.orders_completed }}</span><br>
                                        <span>encomendas entregues</span>
                                    </div>
                                    <div class="col text-center">
                                        <span class="fs-4">{{ this.selectedVehicle.orders_failed }}</span><br>
                                        <span>encomendas falhadas</span>
                                    </div>
                                </div>								
							</div>
						</div>
						<hr>
						<div class="container">
							<h5><font-awesome-icon :icon="['fa', 'building-circle-arrow-right']" size="sm"/>&nbsp; Centro de distribuição #{{ this.selectedVehicle.distribution_center.id }}</h5>
                            <div class="row d-flex mt-3 ms-5">
                                <div class="col mt-2">
                                    <br>
                                    Pais: {{ this.selectedVehicle.distribution_center.address.country }}<br>
                                    Cidade: {{ this.selectedVehicle.distribution_center.address.city }}<br>
                                    Rua: {{ this.selectedVehicle.distribution_center.address.street }}<br>
                                    Código Postal: {{ this.selectedVehicle.distribution_center.address.postal_code }}<br>
                                    Capacidade: {{ this.selectedVehicle.distribution_center.capacity }}m²
                                </div>
                                <div class="col">
                                    <div id="vehicleMap"></div>
                                </div>
                            </div>
						</div>
                        <div class="text-center">
                            <button type="button" class="btn btn-secondary btn-sm mt-4" data-bs-toggle="modal" data-bs-target="#changeVehicleCenter"><font-awesome-icon :icon="['fa', 'pencil']" size="sm"/>&nbsp; Alterar centro de distribuição</button>
                        </div>	
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Voltar</button>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal Change Center -->
            <div class="modal fade" id="changeVehicleCenter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="changeVehicleCenterLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="changeVehicleCenterLabel">Selecione morada do centro #{{ this.selectedVehicle.id }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row justify-content-center" style="max-height: 500px; overflow-y: auto;">
                        <div v-if="calculateDistributionCentersLength() > 0" v-for="center in this.distributionCenters" :key="center.id" class="card mt-3 mb-3" style="width: 300px !important; cursor: pointer;">
                            <div class="card-body" v-on:click="editVehicleCenter(this.selectedVehicle, center)" data-bs-toggle="modal" data-bs-target="#modalDetailsVehicle">
                                <h5><font-awesome-icon :icon="['fa', 'building-circle-arrow-right']" />&nbsp; Centro #{{ center.id }}</h5><br>
                                <h6><font-awesome-icon :icon="['fa', 'location-dot']" />&nbsp; Morada</h6>
                                <address>
                                    {{ center.address.street }}<br>
                                    {{ center.address.city }}, {{ center.address.country }}<br>
                                    <abbr title="CP">Código Postal:</abbr> {{ center.address.postal_code }}
                                </address>
                                <p class="mt-2">Capacidade: {{ center.capacity }}m²</p>          
                            </div>           
                        </div>
                        <div v-else class="text-center mt-3 mb-3">
                            <p>Parece que não se encontram moradas disponíveis.<br>Por favor adicione uma ao seu perfil.</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#detailsCenterModal">Cancelar</button>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal Remove Vehicle -->
            <div class="modal fade" id="removeVehicle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removeVehicleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="removeVehicleLabel">Remover veículo #{{ this.selectedVehicle.id }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Tem a certeza que pretende remover este veículo?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" id="closeRemoveVehicle" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" v-on:click="removeVehicle(this.selectedVehicle.id)">Remover</button>
                </div>
                </div>
            </div>
            </div>

		</div>
	</div>
		
</template>

<script>
import { useToast } from "vue-toastification";
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
        this.getUserDistributionCenters()
	},
	data() {
		const toast = useToast()
        return {
            toast,
			user: {},
			vehicles: [],
			vehiclesLength: 1,
			selectedVehicle: {distribution_center:{address:{}}, total_vehicles:'', capacity:''},
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
            distributionCenters: [],
            selectedCenterNew: {capacity:'', address:{}},
		};
	},
	methods: {
		initVehicleMap() {
            const loader = new Loader({
                apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
                version: "weekly"
            });
            loader.load().then(() => {
                let position = {lat: this.selectedVehicle.distribution_center.address.latitude, lng: this.selectedVehicle.distribution_center.address.longitude}
                let vehicleMap = new google.maps.Map(document.getElementById("vehicleMap"), {
                center: position,
                zoom: 13,
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
        getUserDistributionCenters() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.get(`/transporter/${userId}/centers`, headers)
                .then((response) => {
                    if (response.status == 200) {
                        this.distributionCenters = response.data;
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
            }
        },
        calculateDistributionCentersLength() {
			return Object.keys(this.distributionCenters).length;
		},
        selectVehicle(vehicle) {
            this.selectedVehicle = vehicle;
            this.initVehicleMap()
        },
        conflitSolver(message) {
            if (message == "There is already a vehicle registered with this license plate.")
                document.getElementById("newVehicleLicense").classList.add("is-invalid");
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
                rtl: false
            });
        }, 
        successfulNewVehicle() {
            this.getUserVehicles();
            var closeEditModal = document.getElementById("closeNewVehicleModal");
            closeEditModal.click();
            this.successfulToast("Criado! O veículo foi criado com sucesso.")
        },
        successfulRemoveVehicle() {
            this.getUserVehicles();
            var closeEditModal = document.getElementById("closeRemoveVehicle");
            closeEditModal.click();
            this.successfulToast("Removido! O veículo foi removido com sucesso.")
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
                distribution_center: this.selectedCenterNew.id,
                license_plate: this.newVehicleInfo.license_plate,
                payload_capacity: Number(this.newVehicleInfo.payload_capacity),
                resource_usage: Number(this.newVehicleInfo.resource_usage),
                average_emissions: Number(this.newVehicleInfo.average_emissions),
                fuel_type: this.newVehicleInfo.fuel_type,
            }), headers)
            .then((response) => {
                if (response.status == 201) {
                    this.successfulNewVehicle()
                }
                }).catch((error) => {
                    this.conflitSolver(error.message);
                })
		},
        editVehicleCenter(vehicle, center) {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.put(`/transporter/${userId}/vehicles/${vehicle.id}`, JSON.stringify({
					distribution_center: center.id,
				}), headers)
                .then((response) => {
                    if (response.status == 201) {
						this.selectedVehicle.distribution_center = center;
                        this.successfulToast("Alterado! O centro de distribuição do veículo foi alterado com sucesso.");
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
            }
        },
		removeVehicle(vehicle) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId) {
                http.delete(`/transporter/${userId}/vehicles/${vehicle}`, headers)
                    .then((response) => {
                        console.log(response)
                        if (response.status == 200) {
                            this.successfulRemoveVehicle();
                        }
                    }).catch(error => {
                            console.log(error)
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
        height: 165px;
        width: 100%;
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
    #vehicleTruckInfo {
        width: 150px;
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
    .licensePlateInfo {
        width: 150px !important;
		background-color: white;
		text-align: center;
		font-weight: bold;
		font-size: 25px;
		border-radius: 5px;
		border: 1px solid #000;
		box-shadow: 1px 1px 1px #ddd;
		font-family: helvetica, ariel, sans-serif;
	}
</style>