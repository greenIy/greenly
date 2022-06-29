<template>
	<div class="container mt-5">
		<div class="row align-items-start">
			<div class="col-4">
				<div class="card fixedMap">
					<div v-if="this.distributionCentersLength > 0" class="card-body">
						<div id="map"></div>
					</div>
					<div v-else class="card-body text-center fs-4" style="margin-top: 250px">
						<p>Parece que ainda não criou nenhum centro de distribuição.</p>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="col d-inline-flex">
					<div class="card me-4" style="width: 100%; cursor:pointer" data-bs-toggle="modal" data-bs-target="#newCenterModal">
						<div class="card-body addCenterButton align-items-center justify-content-center">
							<h1><font-awesome-icon :icon="['fa', 'plus']" size="2xl" style="color: grey" /></h1>
							<span>criar centro<br>de distribuição</span>
						</div>
					</div>
					<div class="card me-4" style="width: 100%;">
						<div class="card-body text-center">
							<h5 class="card-title"><font-awesome-icon :icon="['fa', 'building-circle-arrow-right']" />&nbsp; Centros de distribuição</h5>
							<h1 class="card-text">{{ this.calculateDistributionCentersLength() }}</h1>
							<hr>
							<small class="card-text">número total de centros de distribuição</small>
						</div>
					</div>
					<div class="card me-4" style="width: 100%;">
						<div class="card-body text-center">
							<h5 class="card-title"><font-awesome-icon :icon="['fa', 'truck']" />&nbsp; Veículos de distribuição</h5>
							<h1 class="card-text">{{ this.calculateTotalVehicles() }}</h1>
							<hr>
							<small class="card-text">número total de veículos do centro de distribuição</small>
						</div>
					</div>
				</div>
				<div v-if="this.distributionCentersLength > 0" class="row ms-1">
					<div v-for="(center, index) in this.distributionCenters" :key="center.id" class="card mt-4 me-4" style="max-width: 46%; height: 410px;">
						<div class="card-body p-4">
							<h5 class="card-title"><font-awesome-icon :icon="['fa', 'building-circle-arrow-right']" />&nbsp; #{{ center.id }}</h5>
							<div class="position-absolute top-0 end-0 p-4 pe-4">
								<p data-bs-toggle="modal" data-bs-target="#removeCenter" style="cursor: pointer; color: red;" v-on:click="this.selectedCenter = center">Remover</p>
							</div>
							<hr>
							<div style="height: 35%;">
								<h6><font-awesome-icon :icon="['fa', 'location-dot']" size="sm"/>&nbsp; Morada</h6>
								<address>
									{{ center.address.street }}<br>
									{{ center.address.city }}, {{ center.address.country }}<br>
									<abbr title="CP">Código Postal:</abbr> {{ center.address.postal_code }}
								</address>
							</div>
							<h6><font-awesome-icon :icon="['fa', 'truck']" />&nbsp; Capacidade</h6>
							<span >Dimensão: {{ Math.ceil(center.total_vehicles*36) }}m²/{{ center.capacity }}m²</span><br>
							<span >Veículos: {{ center.total_vehicles }}/{{ Math.floor(center.capacity/36) }}</span>
							<div class="progress mt-2">
								<div v-if="getDistributionsCenterCapacity(index) < 100 " :id="'capacityBar' + center.id" class="progress-bar bg-success" role="progressbar" :style="{ 'width': String(getDistributionsCenterCapacity(index)) + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
								<div v-else :id="'capacityBar' + center.id" class="progress-bar bg-danger" role="progressbar" :style="{ 'width': String(getDistributionsCenterCapacity(index)) + '%'}" aria-valuemin="0" aria-valuemax="100"></div>
							</div>
							<div class="text-center mt-4">
								<button type="button" class="btn btn-secondary btn-sm me-3" v-on:click="changeMapCenter(center.address.latitude, center.address.longitude)"><font-awesome-icon :icon="['fa', 'location-crosshairs']" />&nbsp; Destacar no mapa</button>
								<button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#detailsCenterModal" v-on:click="getDistributionCenterInfo(center)"><font-awesome-icon :icon="['fa', 'up-right-and-down-left-from-center']" />&nbsp; Mais detalhes</button>
							</div>
						</div>
					</div>				
				</div>

				<!-- Modal New Center -->
				<div class="modal fade" id="newCenterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newCenterModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="newCenterModalLabel">Criar centro de distribuição</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<form @submit.prevent="newDistributionCenter()">
					<div class="modal-body">
							<div class="col mb-3">
								<label for="newCenterCapacity" class="form-label">Capacidade em m² <span style='color: #FF0000;'>*</span></label>
								<input type="number" class="form-control w-50 ms-3" id="newCenterCapacity" v-model="this.newCenterInfo.capacity" placeholder="Capacidade" required>
							</div>
							<div class="col mb-3">
								<label for="newCenterAddress" class="form-label">Morada <span style='color: #FF0000;'>*</span></label><br>
								<div v-if="!this.newCenterInfo.address.street" class="mb-3 ms-3">
									<small>Ainda não selecionou nenhuma morada.</small><br>
									<small>Por favor selecione uma morada a partir do conjunto de moradas associadas ao seu perfil.</small>
								</div>
								<div v-else>
									<div class="card mb-3 ms-2" style="width: 300px !important; cursor: pointer;">
										<div class="card-body">
											<address>
												<strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ this.newCenterInfo.address.city }}</strong><br>
												{{ this.newCenterInfo.address.street }}<br>
												{{ this.newCenterInfo.address.city }}, {{ this.newCenterInfo.address.country }}<br>
												Código Postal: {{ this.newCenterInfo.address.postal_code }}<br>
												NIF: {{ this.newCenterInfo.address.nif }}
											</address>
										</div>
									</div>  
								</div>
								<button type="button" class="btn btn-secondary ms-3" data-bs-toggle="modal" data-bs-target="#chooseAddressNewCenter" id="newCenterAddress" v-on:click=""><font-awesome-icon :icon="['fa', 'map-location-dot']" />&nbsp; Moradas disponiveis</button>
                        	</div>
					</div>
					<div class="modal-footer">
						<button type="button" id="closeNewCenterModal" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
						<button v-if="!this.newCenterInfo.address.street" type="submit" class="btn btn-primary" disabled>Criar</button>
						<button v-else type="submit" class="btn btn-primary">Criar</button>
					</div>
					</form>
					</div>
				</div>
				</div>

				<!-- Modal Choose Address New Center -->
				<div class="modal fade" id="chooseAddressNewCenter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="chooseAddressNewCenterLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="chooseAddressNewCenterLabel">Selecione a morada do centro de distribuição</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="row justify-content-center" style="max-height: 500px; overflow-y: auto;">
							<div v-if="getUnusedAddressesSize() > 0" v-for="address in getUnusedAddresses()" :key="address.nif" class="card mt-3 mb-3" style="width: 300px !important; cursor: pointer;" v-on:click="this.newCenterInfo.address = address" data-bs-toggle="modal" data-bs-target="#newCenterModal">
								<div class="card-body">
									<address>
										<strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ address.city }}</strong><br>
										{{ address.street }}<br>
										{{ address.city }}, {{ address.country }}<br>
										Código Postal: {{ address.postal_code }}<br>
										NIF: {{ address.nif }}
									</address>           
								</div>
							</div>
							<div v-else class="text-center mt-3 mb-3">
								<p data-bs-dismiss="modal">Parece que não se encontram moradas disponíveis.<br>Por favor adicione uma ao seu <router-link class="greenly-link" to="/perfil/moradas">perfil</router-link>!</p>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newCenterModal">Voltar</button>
					</div>
					</div>
				</div>
				</div>

				<!-- Modal Details Center -->
				<div class="modal fade" id="detailsCenterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="detailsCenterModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-lg modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="detailsCenterModalLabel">Centro de distribuição #{{ this.selectedCenter.id }}</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<div class="row align-items-start">
								<div class="col">
									<h5><font-awesome-icon :icon="['fa', 'location-dot']" size="sm"/>&nbsp; Morada</h5>
									<address class="ms-2 mt-2">
										{{ this.selectedCenter.address.street }}<br>
										{{ this.selectedCenter.address.city }}, {{ this.selectedCenter.address.country }}<br>
										<abbr title="CP">Código Postal:</abbr> {{ this.selectedCenter.address.postal_code }}
									</address>
									<div class="text-center">
										<button type="button" class="btn btn-secondary btn-sm mt-5" data-bs-toggle="modal" data-bs-target="#chooseAddressModal"><font-awesome-icon :icon="['fa', 'pencil']" size="sm"/>&nbsp; Alterar morada</button>
									</div>
								</div>
								<div class="col">
									<div id="centerMap"></div>
								</div>
							</div>
						</div>
						<hr>
						<div class="container">
							<h5><font-awesome-icon :icon="['fa', 'truck']" size="sm"/>&nbsp; Capacidade</h5>
							<p class="mt-3 ms-2 fs-5">Dimensão: {{ Math.ceil(this.selectedCenter.total_vehicles*36) }}m²/{{ this.selectedCenter.capacity }}m²</p><br>
							<div class="row align-items-start" style="max-height: 210px; min-height: 185px; overflow-y: auto;">	
								<div v-if="getCenterTotalVehicles(this.selectedCenter) > 0" v-for="(vehicle, index) in this.selectedCenter.vehicles" :key="vehicle.id" class="card ms-2 me-4" style="width: 20.5%; height: 150px !important;">
									<div class="card-body">
										<img id="centerTruck" src="../../assets/centerTruck.png">
										<br>
										<p class="licensePlate">{{ vehicle.license_plate }}</p>
									</div>
								</div>
								<div v-else class="text-center fs-5 mt-5">
									<p>Parece que ainda não adicionou veículos a este centro de distribuição.</p>
								</div>
							</div>
							<div class="text-left mt-4">
								<div class="progress me-3" style="height: 28px;">
									<div id="selectedCapacityBar" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100">{{ this.selectedCenter.total_vehicles }} / {{ Math.floor(this.selectedCenter.capacity/36) }}</div>
								</div>
							</div>
							<div class="text-center">
								<button type="button" class="btn btn-secondary btn-sm mt-4" data-bs-toggle="modal" data-bs-target="#changeCapacityModal"><font-awesome-icon :icon="['fa', 'pencil']" size="sm"/>&nbsp; Alterar capacidade máxima</button>
							</div>
						</div>		
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Voltar</button>
					</div>
					</div>
				</div>
				</div>

				<!-- Modal Choose Address -->
				<div class="modal fade" id="chooseAddressModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="chooseAddressModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="chooseAddressModalLabel">Selecione morada do centro #{{ this.selectedCenter.id }}</h5>
						<button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#detailsCenterModal"></button>
					</div>
					<div class="modal-body">
						<div class="row justify-content-center" style="max-height: 500px; overflow-y: auto;">
							<div v-if="getUnusedAddressesSize() > 0" v-for="address in getUnusedAddresses()" :key="address.nif" class="card mt-3 mb-3" style="width: 300px !important; cursor: pointer;">
								<div class="card-body" v-on:click="editCenterAddress(this.selectedCenter, address)" data-bs-toggle="modal" data-bs-target="#detailsCenterModal">
									<address>
										<strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ address.city }}</strong><br>
										{{ address.street }}<br>
										{{ address.city }}, {{ address.country }}<br>
										Código Postal: {{ address.postal_code }}<br>
										NIF: {{ address.nif }}
									</address>           
								</div>
							</div>
							<div v-else class="text-center mt-3 mb-3">
								<p>Parece que não se encontram moradas disponíveis.<br>Por favor adicione uma ao seu <router-link class="greenly-link" to="/perfil/moradas" data-bs-dismiss="modal">perfil</router-link>!</p>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#detailsCenterModal">Cancelar</button>
					</div>
					</div>
				</div>
				</div>

				<!-- Modal Change Capacity -->
				<div class="modal fade" id="changeCapacityModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="changeCapacityModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="changeCapacityModalLabel">Centro de distribuição #{{ this.selectedCenter.id }}</h5>
						<button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#detailsCenterModal"></button>
					</div>
					<form @submit.prevent="editCenterCapacity(this.selectedCenter)">
					<div class="modal-body">
						<div class="text-center">
							<h5>Capacidade atual:</h5>
							<p class="fs-4">&nbsp; {{ this.selectedCenter.capacity }}m²</p>
							<h5 class="mt-4">Nova capacidade:</h5>
	
							<div class="text-center d-flex justify-content-center align-items-center">
								<input type="number" class="form-control mt-2" id="newSelectedCenterCapacity" placeholder="Capacidade" style="width: 40%" required>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" id="closeChangeCapacity" data-bs-toggle="modal" data-bs-target="#detailsCenterModal">Cancelar</button>
						<button type="submit" class="btn btn-primary">Alterar</button>
					</div>
					</form>
					</div>
				</div>
				</div>

				<!-- Modal Remove Center -->
				<div class="modal fade" id="removeCenter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removeCenterLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="removeCenterLabel">Remover centro de distribuição #{{ this.selectedCenter.id }}</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<p>Tem a certeza que pretende remover este centro de distribuição?</p>
					</div>
					<div class="modal-footer">
						<button type="button" id="closeRemoveCenter" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
						<button type="button" class="btn btn-danger" v-on:click="removeDistributionCenter(this.selectedCenter.id)">Remover</button>
					</div>
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
import { faBuildingCircleArrowRight, faLocationDot, faTruck, faTree, faSmog, faLocationCrosshairs, faUpRightAndDownLeftFromCenter, faPencil, faPlus, faMinus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
library.add(faBuildingCircleArrowRight, faLocationDot, faTruck, faTree, faSmog, faLocationCrosshairs, faUpRightAndDownLeftFromCenter, faPencil, faPlus, faMinus, faCircleMinus);

import http from "../../../http-common";
import { Loader } from "@googlemaps/js-api-loader"

export default {
	name: "DistributionCenters",
	mounted() {
		this.getUserInfo()
		this.getUserDistributionCenters();
	},
	data() {
		const toast = useToast()
        return {
            toast,
			user: {addresses:[]},
			distributionCenters: [],
			distributionCentersLength: 1,
			selectedCenter: {capacity:'', address:{}},
			map: {},
			newCenterInfo: {capacity:'', address:{}},
			selectedCenterNew: {capacity:'', address:{}},
		};
	},
	methods: {
		initMaps() {
            const loader = new Loader({
                apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
                version: "weekly"
            });
            loader.load().then(() => {
                let mapCenter = {lat: this.distributionCenters[0].address.latitude, lng: this.distributionCenters[0].address.longitude}
                this.map = new google.maps.Map(document.getElementById("map"), {
                center: mapCenter,
                zoom: 10,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                zoomControl: false,
                disableDoubleClickZoom: true,
                draggable: false,
                disableDefaultUI: true,
                clickableIcons: false,
                })
				for (let distributionCenter of this.distributionCenters) {
					let markerPosition = {lat: distributionCenter.address.latitude, lng: distributionCenter.address.longitude}
					const marker = new google.maps.Marker({
                        position: markerPosition,
                        map: this.map,
                        label: {
                            text: `#${distributionCenter.id}`,
                            color: "#FFF"
                        }
                    }
                );
				}
            })
        },
		initCenterMap() {
            const loader = new Loader({
                apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
                version: "weekly"
            });
            loader.load().then(() => {
                let position = {lat: this.selectedCenter.address.latitude, lng: this.selectedCenter.address.longitude}
                let centerMap = new google.maps.Map(document.getElementById("centerMap"), {
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
                        map: centerMap,
                        label: {
                            text: " ",
                            color: "#FFF"
                        }
                    }
                );
            })
        },
		changeMapCenter(lat, long) {
			var latLng = new google.maps.LatLng(lat, long)
			this.map.panTo(latLng);
		},
		getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.user
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
						this.initMaps();
						this.calculateDistributionCentersLength();
						this.getUnusedAddresses();
						this.getUnusedAddressesSize();
						console.log(this.distributionCenters)
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
            }
        },
		getDistributionCenterInfo(center) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.get(`/transporter/${userId}/centers/${center.id}`, headers)
                .then((response) => {
                    if (response.status == 200) {
                        this.selectedCenter = response.data;
						this.initCenterMap()
						this.getCenterCapacity(this.selectedCenter);
                    }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
		},
		calculateDistributionCentersLength() {
			this.distributionCentersLength = Object.keys(this.distributionCenters).length;
			return this.distributionCentersLength
		},
		calculateTotalVehicles() {
			let totalVehicles = 0
			for (let distributionCenter of this.distributionCenters) {
				totalVehicles += distributionCenter.total_vehicles
			}
			return totalVehicles
		},
		getCenterTotalVehicles(center) {
			return center.total_vehicles;
		},
		getCenterCapacity(center) {
			let vehicleEstimate = Math.floor(center.capacity/36) > 0 ? Math.floor(center.capacity/36) : 1
			let percentage = (center.total_vehicles / vehicleEstimate) * 100
			if (percentage < 100) {
				document.getElementById('selectedCapacityBar').style.width = `${percentage}%`;
				document.getElementById('selectedCapacityBar').classList.remove("bg-danger")
				document.getElementById('selectedCapacityBar').classList.add("bg-success")
			} else {
				console.log(percentage)
				document.getElementById('selectedCapacityBar').style.width = `${percentage}%`;
				document.getElementById('selectedCapacityBar').classList.remove("bg-success")
				document.getElementById('selectedCapacityBar').classList.add("bg-danger")
			}
			
		},
		getDistributionsCenterCapacity(index) {
			let distributionCenter = this.distributionCenters[index]
			let vehicleEstimate = Math.floor(distributionCenter.capacity/36) > 0 ? Math.floor(distributionCenter.capacity/36) : 1
			return (distributionCenter.total_vehicles / vehicleEstimate) * 100
		},
		getUnusedAddresses() {
			return this.user.addresses.filter((address) => {
				let usedDistributionCenterAddresses = this.distributionCenters.map((center) => center.address.id)
				return !usedDistributionCenterAddresses.includes(address.id)
			})
		},
		getUnusedAddressesSize() {
			return Object.keys(this.getUnusedAddresses()).length;
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
		successfulNewCenter() {
            this.getUserDistributionCenters();
            var closeEditModal = document.getElementById("closeNewCenterModal");
            closeEditModal.click();
			this.successfulToast("Adicionado! O novo centro de distribuição foi adicionado com sucesso.")
        },
		successfulNewCapacity() {
			var closeEditModal = document.getElementById("closeChangeCapacity");
            closeEditModal.click();
			this.getUserDistributionCenters();
			this.getDistributionCenterInfo(this.selectedCenter);
			this.successfulToast("Alterada! A capacidade máxima do centro foi alterada com sucesso.")
		},
		successfulRemoveCenter() {
            this.getUserDistributionCenters();
            var closeEditModal = document.getElementById("closeRemoveCenter");
            closeEditModal.click();
            this.successfulToast("Removido! O centro de distribuição foi removido com sucesso.")
        },
		newDistributionCenter() {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            http.post(`/transporter/${userId}/centers`, JSON.stringify({
                address: this.newCenterInfo.address.id,
                capacity: this.newCenterInfo.capacity,
            }), headers)
            .then((response) => {
                if (response.status == 200) {
                    this.successfulNewCenter()
                }
                }).catch((error) => {
                    console.log(error);
                })
		},
		editCenterAddress(center, address) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.put(`/transporter/${userId}/centers/${center.id}`, JSON.stringify({
					address: address.id,
				}), headers)
                .then((response) => {
                    if (response.status == 201) {
						this.getDistributionCenterInfo(center);
						this.getUserDistributionCenters()
                        this.successfulToast("Alterada! A morada do centro foi alterada com sucesso.")
                    }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
		},
		editCenterCapacity(center) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
			let newCapacity = document.getElementById("newSelectedCenterCapacity").value;
            if (accessToken && userId){
                http.put(`/transporter/${userId}/centers/${center.id}`, JSON.stringify({
					capacity: Number(newCapacity),
				}), headers)
                .then((response) => {
                    if (response.status == 201) {
                        this.successfulNewCapacity();
                    }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
		},
		removeDistributionCenter(center) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId) {
                http.delete(`/transporter/${userId}/centers/${center}`, headers)
                    .then((response) => {
						console.log(response)
                        if (response.status == 200) {
                            this.successfulRemoveCenter() 
                        }
                    }).catch(error => {
                            console.log(error.response)
                    }) 
            }
		}
	}
			
};
</script>

<style scoped>
	#map {
        height: 620px;
        width: 100%;
    }
	#centerMap {
        height: 220px;
        width: 100%;
		border-radius: 5px;
    }
	.fixedMap {
		z-index: 1;
		position: fixed;
		height: 650px;
        width: 400px;
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
	#centerTruck {
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
	.addCenterButton {
		text-align: center;
		margin-top: 10%;
	}
	.greenly-link {
        color: #5e9f88 !important;
    }
	#selectedCapacityBar {
		font-size: 15px;
		font-weight: bold;
	}
	::-webkit-scrollbar {
        width: 17px;
    }
    ::-webkit-scrollbar-track {
        background-color: #E4E4E4;
        border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 5px solid transparent;
        background-clip: content-box;
        background-color: #5E9F88;
    }
    :focus {
        outline: 0 !important;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
    }
</style>
