<template>
	<div class="container mt-5">
		<div class="row align-items-start">
            <div class="row align-items-start">
                <div class="mt-4 d-flex">
                    <button type="button" class="btn btn-secondary ms-3 mb-3 me-3" data-bs-toggle="modal" data-bs-target="#modalNewItem" style="width: 200px"><font-awesome-icon :icon="['fa', 'plus']" />&nbsp; Criar fornecimento</button>
                    <font-awesome-icon :icon="['fa', 'circle-question']" size="2xl" style="color: grey; cursor: pointer; margin-top: 3px" data-bs-toggle="modal" data-bs-target="#userHelper"/>
                </div>
                <div v-if="calculateInventoryLength() <= 0" class="text-center">
                    <p class="mt-5 fs-3">Parece que ainda não tem fornecimentos.</p>
                </div>
                <div v-for="(item, index) in this.inventory" :key="item.id" class="accordion mb-4" id="accordion">
                    <div class="accordion-item" :id="'item' + item.id">
                        <h2 class="accordion-header" :id="'heading' + item.id">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + item.id" aria-expanded="false" :aria-controls="'collapse' + item.id">
                            <div class="container">
                                <span class="fs-5">Fornecimento #{{ item.id }}</span>
                                <hr>
                                <div class="row">
                                    <div class="col">
                                        <span><font-awesome-icon :icon="['fa', 'leaf']" />&nbsp; {{ item.product.name }}</span>
                                    </div>
                                    <div class="col">
                                        <span><font-awesome-icon :icon="['fa', 'tag']" />&nbsp; {{ item.price }}€</span>
                                    </div>
                                    <div class="col">
                                        <span><font-awesome-icon :icon="['fa', 'warehouse']" />&nbsp; Armazém #{{ item.warehouse.id }}</span>
                                    </div>
                                    <div class="col">
                                        <span v-if="this.calculateExpirationTime(item.expiration_date) > 10"><font-awesome-icon :icon="['fa', 'calendar-xmark']" />&nbsp; {{ `${String(new Date(item.expiration_date).getDate()).padStart(2, '0')}/${String(new Date(item.expiration_date).getMonth()+1).padStart(2, '0')}/${new Date(item.expiration_date).getFullYear()}` }}</span>
                                        <span v-if="this.calculateExpirationTime(item.expiration_date) < 10 && this.calculateExpirationTime(item.expiration_date) > 1"><font-awesome-icon :icon="['fa', 'calendar-xmark']" />&nbsp; {{ `${String(new Date(item.expiration_date).getDate()).padStart(2, '0')}/${String(new Date(item.expiration_date).getMonth()+1).padStart(2, '0')}/${new Date(item.expiration_date).getFullYear()}` }}<br>(quase a expirar)</span>
                                        <span v-if="this.calculateExpirationTime(item.expiration_date) <= 1"><font-awesome-icon :icon="['fa', 'calendar-xmark']" />&nbsp; {{ `${String(new Date(item.expiration_date).getDate()).padStart(2, '0')}/${String(new Date(item.expiration_date).getMonth()+1).padStart(2, '0')}/${new Date(item.expiration_date).getFullYear()}` }}<br>(expirado)</span>
                                    </div>
                                </div>
                            </div> 
                            </button>
                        </h2>
                        <div :id="'collapse' + item.id" class="accordion-collapse collapse" :aria-labelledby="'heading' + item.id">
                            <div class="accordion-body">
                                <div class="row ms-4 mt-3">
                                    <div class="col">
                                        <h5><font-awesome-icon :icon="['fa', 'leaf']" />&nbsp; Produto #{{ item.product.id }}</h5>
                                        <div class="mt-3 ms-3">
                                            <table class="table">
                                                <tbody>
                                                    <tr>
                                                        <td>Nome</td>
                                                        <td class="text-end">{{ item.product.name }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Categoria</td>
                                                        <td class="text-end">{{ item.product.category.name }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Quantidade</td>
                                                        <td class="text-end">{{ item.quantity }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Preço</td>
                                                        <td class="text-end">{{ item.price }}€</td>
                                                    </tr>
                                                    <tr>
                                                        <td> Data de produção</td>
                                                        <td class="text-end">{{ `${String(new Date(item.production_date).getDate()).padStart(2, '0')}/${String(new Date(item.production_date).getMonth()+1).padStart(2, '0')}/${new Date(item.production_date).getFullYear()}`}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Data de validade</td>
                                                        <td class="text-end">{{ `${String(new Date(item.expiration_date).getDate()).padStart(2, '0')}/${String(new Date(item.expiration_date).getMonth()+1).padStart(2, '0')}/${new Date(item.expiration_date).getFullYear()}`}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="text-center">
                                            <button type="button" class="btn btn-secondary btn-sm mt-1 me-3" data-bs-toggle="modal" data-bs-target="#editItemDetails" v-on:click="getItemInfo(item.id)"><font-awesome-icon :icon="['fa', 'pencil']" size="sm"/>&nbsp; Editar detalhes</button>
                                            <button type="button" class="btn btn-secondary btn-sm mt-1 me-3" data-bs-toggle="modal" data-bs-target="#editItemTransporters" v-on:click="getItemInfo(item.id)"><font-awesome-icon :icon="['fa', 'up-right-and-down-left-from-center']" size="sm"/>&nbsp; Visualizar transportadores</button>
                                            <button type="button" class="btn btn-danger btn-sm mt-1" data-bs-toggle="modal" data-bs-target="#removeItem" v-on:click="this.selectedItem = item"><font-awesome-icon :icon="['fa', 'trash']" size="sm"/>&nbsp; Remover</button>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <h5><font-awesome-icon :icon="['fa', 'location-dot']" />&nbsp; Morada</h5>
                                        <div class="ms-3">
                                            <div class="card mt-3 mb-3" style="width: 100%; height: 300px;">
                                            <div class="card-img-top itemMap" :id="'item-' + item.id"></div>
                                                <div class="card-body">
                                                    <div class="card-text">
                                                        <small>
                                                            {{ item.warehouse.address.city }}, {{ item.warehouse.address.country }}<br>
                                                            {{ item.warehouse.address.street }}<br>
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
            <div class="modal fade" id="modalNewItem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalNewItemLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalNewItemLabel">Novo fornecimento</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                <form @submit.prevent="newItem">
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="newItemCenter" class="form-label">Armazém <span style='color: #FF0000;'>*</span></label><br>
                            <div v-if="!this.selectedWarehouseNew.capacity" class="mb-3 ms-3">
									<small>Ainda não selecionou nenhum armazém.</small><br>
									<small>Por favor selecione um armazém a partir do conjunto de armazéns associados ao seu perfil.</small>
								</div>
								<div v-else>
									<div class="card mb-3 ms-2" style="width: 75% !important; cursor: pointer;">
										<div class="card-body">
											<address>
												<strong><font-awesome-icon :icon="['fa', 'warehouse']" />&nbsp; Armazém #{{ this.selectedWarehouseNew.id  }}</strong><br>
                                                {{ this.selectedWarehouseNew.address.street }} <br>
												{{ this.selectedWarehouseNew.address.city  }}, {{ this.selectedWarehouseNew.address.country  }}<br>
												<p class="mt-2">Capacidade: {{ this.selectedWarehouseNew.capacity }}<br></p>
											</address>
										</div>
									</div>  
								</div>
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newItemWarehouse" id="newCenterAddress" v-on:click=""><font-awesome-icon :icon="['fa', 'warehouse']" />&nbsp; Armazéns disponíveis</button>
                        </div>
                        <div class="col-md-6">
                            <label for="newItemProduct" class="form-label">Produto <span style='color: #FF0000;'>*</span></label><br>
                            <select id="inputProduct" name="inputProduct" class="form-control" v-model="newItemInfo.product" required v-on:click="removeIsInvalid()">
                                <option v-for="product in this.products" :key="product.id" :value="product.id">{{ product.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="newItemQuantity" class="form-label">Quantidade <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="newItemQuantity" v-model="newItemInfo.quantity" placeholder="Quantidade" required>
                        </div>
                        <div class="col-md-6">
                            <label for="newItemPrice" class="form-label">Preço (€) <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="newItemPrice" v-model="newItemInfo.price" placeholder="Preço" required>
                        </div>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="newItemProductionDate" class="form-label">Data de produção <span style='color: #FF0000;'>*</span></label>
                            <input type="date" class="form-control" id="newItemProductionDate" v-model="newItemInfo.production_date" required v-on:click="removeIsInvalid()">
                            <small class="text-center">(deve ser uma data anterior ou igual ao dia de hoje)</small>
                        </div>
                        <div class="col-md-6">
                            <label for="newExpirationDate" class="form-label">Data de validade <span style='color: #FF0000;'>*</span></label>
                            <input type="date" class="form-control" id="newExpirationDate" v-model="newItemInfo.expiration_date" required v-on:click="removeIsInvalid()">
                            <small class="text-center">(deve ser uma data posterior ao dia de hoje)</small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeNewItemModal" data-bs-dismiss="modal">Cancelar</button>
                        <button v-if="this.selectedWarehouseNew.address.street" type="submit" class="btn btn-primary">Criar fornecimento</button>
                        <button v-else type="submit" class="btn btn-primary" disabled>Criar fornecimento</button>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal New Item Warehouse -->
            <div class="modal fade" id="newItemWarehouse" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newItemWarehouseLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="newItemWarehouseLabel">Selecione o armazém</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row justify-content-center" style="max-height: 500px; overflow-y: auto;">
                        <div v-if="calculateWarehousesLength() > 0" v-for="warehouse in this.warehouses" :key="warehouse.id" class="card mt-3 mb-3" style="width: 300px !important; cursor: pointer;">
                            <div class="card-body" v-on:click="this.selectedWarehouseNew = warehouse" data-bs-toggle="modal" data-bs-target="#modalNewItem">
                                <div>
                                    <h5><font-awesome-icon :icon="['fa', 'warehouse']" />&nbsp; Armazém #{{ warehouse.id }}</h5><br>
                                    <h6><font-awesome-icon :icon="['fa', 'location-dot']" />&nbsp; Morada</h6>
                                    <address>
                                        {{ warehouse.address.street }}<br>
                                        {{ warehouse.address.city }}, {{ warehouse.address.country }}<br>
                                        <abbr title="CP">Código Postal:</abbr> {{ warehouse.address.postal_code }}
								    </address>
                                    <p class="mt-2">Capacidade: {{ warehouse.capacity }}m²</p>
                                </div>           
                            </div>
                        </div>
                        <div v-else class="text-center mt-3 mb-3">
                            <p data-bs-dismiss="modal">Parece que não tem armazéns associados à sua conta.<br><router-link class="greenly-link" to="/painel/armazens">Adicione um</router-link>!</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalNewItem">Voltar</button>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal Edit Item Details -->
            <div class="modal fade" id="editItemDetails" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editItemDetailsLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editItemDetailsLabel">Editar fornecimento #{{ this.selectedItem.id }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                <form @submit.prevent="editItemDetails(this.selectedItem.id)">
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="editItemQuantity" class="form-label">Quantidade <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="editItemQuantity" v-bind:value="this.selectedItem.quantity" placeholder="Quantidade" required>
                        </div>
                        <div class="col-md-6">
                            <label for="editItemPrice" class="form-label">Preço (€) <span style='color: #FF0000;'>*</span></label>
                            <input type="number" class="form-control" id="editItemPrice" v-bind:value="this.selectedItem.price" placeholder="Preço" required>
                        </div>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="editProductionDate" class="form-label">Data de produção <span style='color: #FF0000;'>*</span></label>
                            <input type="date" class="form-control" id="editProductionDate" v-bind:value="formatDate(this.selectedItem.production_date)" required>
                            <small class="text-center">(tem que ser uma data anterior ou igual ao dia de hoje)</small>
                        </div>
                        <div class="col-md-6">
                            <label for="editExpirationDate" class="form-label">Data de validade <span style='color: #FF0000;'>*</span></label>
                            <input type="date" class="form-control" id="editExpirationDate" v-bind:value="formatDate(this.selectedItem.expiration_date)" required>
                            <small class="text-center">(tem que ser uma data posterior ao dia de hoje)</small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeEditItemDetails" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Editar</button>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal Edit Item Transporters -->
            <div class="modal fade" id="editItemTransporters" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editItemTransportersLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editItemTransportersLabel">Transportadores fornecimento #{{ this.selectedItem.id }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div v-if="this.selectedItemTransportsLength < 1">
                        <p class="text-center">Parece que ainda não tem nenhum transportador associado a este fornecimento.<br>Adicione um!</p>
                    </div>
                    <div v-else>
                        <div class="row justify-content-center">
                            <div class="col-auto">
                                <table class="table table-responsive">
                                    <thead>
                                        <tr>
                                            <td>Nome</td>
                                            <td>Média de recursos</td>
                                            <td>Emissões médias</td>
                                            <td>Preço</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="transporter in this.selectedItem.transports" :key="transporter.id">
                                            <td>{{ transporter.transporter.name }}</td>
                                            <td>{{ Math.round(transporter.transporter.average_resource_usage * 100) / 100 }} <small>l/100km</small></td>
                                            <td>{{ Math.round(transporter.transporter.average_emissions * 100) / 100 }} <small>CO₂ g/km/t</small></td>
                                            <td>{{ transporter.price }}€</td>
                                            <td> &nbsp; &nbsp;</td>
                                            <td><span style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#editItemTransporter" v-on:click="this.selectedItemTransporter = transporter">Editar</span></td>
                                            <td><span style="cursor: pointer; color: red" data-bs-toggle="modal" data-bs-target="#removeItemTransporter" v-on:click="this.selectedItemTransporter = transporter.transporter.id">Remover</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <form @submit.prevent="addTransporter(this.selectedItem.id, newItemTransporter.transporter)" class="mt-5">
                        <div class="row g-3 mb-3 justify-content-center">
                            <div class="col-md-3">
                                <label for="addTransporterItem" class="form-label">Transportador <span style='color: #FF0000;'>*</span></label><br>
                                <select id="addTransporterItem" name="itemTransporter" class="form-control" v-model="newItemTransporter.transporter" required v-on:click="removeIsInvalid()">
                                    <option v-for="transporter in this.transporters" :key="transporter.id" :value="transporter.id">{{ transporter.company.name }}</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="addTransporterPrice" class="form-label">Preço (€) <span style='color: #FF0000;'>*</span></label>
                                <input type="number" class="form-control" id="addTransporterPrice" v-model="newItemTransporter.price" placeholder="Preço" required>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label" style="color: white">.</label><br>
                                <button type="submit" class="btn btn-primary"><font-awesome-icon :icon="['fa', 'plus']" size="sm"/>&nbsp; Adicionar</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal Edit Item Transporter -->
            <div class="modal fade" id="editItemTransporter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editItemTransporterLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editItemTransporterLabel">Editar preço transportador</h5>
                    <button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#editItemTransporters"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center">
                        <h5>Preço atual:</h5>
                        <p class="fs-4">&nbsp; {{ this.selectedItemTransporter.price }}€</p>
                        <h5 class="mt-4">Novo preço:</h5>

                        <div class="text-center d-flex justify-content-center align-items-center">
                            <input type="number" class="form-control mt-2" id="newItemTransporterPrice" placeholder="Preço" style="width: 40%" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editItemTransporters">Cancelar</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editItemTransporters" v-on:click="editItemTransporter()">Editar</button>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal Remove Item Transporter -->
            <div class="modal fade" id="removeItemTransporter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removeItemTransporterLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="removeItemTransporterLabel">Remover transportador</h5>
                    <button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#editItemTransporters"></button>
                </div>
                <div class="modal-body">
                    <p>Tem a certeza que pretende remover este transportador?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" id="closeremoveItemTransporter" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editItemTransporters">Cancelar</button>
                    <button type="button" class="btn btn-danger" v-on:click="removeItemTransporter(this.selectedItemTransporter)" data-bs-toggle="modal" data-bs-target="#editItemTransporters">Remover</button>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal Remove Item -->
            <div class="modal fade" id="removeItem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removeItemLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="removeItemLabel">Remover fornecimento #{{ this.selectedItem.id }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Tem a certeza que pretende remover este forncecimento?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" id="closeRemoveItem" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" v-on:click="removeItem(this.selectedItem.id)">Remover</button>
                </div>
                </div>
            </div>
            </div>

            <!-- Modal User Helper -->
            <div class="modal fade" id="userHelper" tabindex="-1" aria-labelledby="userHelperLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ajuda</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Como posso criar um novo fornecimento?
                            </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Basta clicar no botão "Criar fornecimento" e preencher todos os campos como pedido. Para ser possível selecionar um armazém, é necessário ter um previamente criado e associado à sua conta.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Como posso remover um fornecimento?
                            </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Abra o menu dropdown do respetivo fornecimento. Clique em "Remover". Irá ser aberta uma caixa de confirmação e, depois de refletir na sua decisão, pode remover o fornecimento.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Como posso visualizar e editar as informações do meu fornecimento?
                            </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Abra o menu dropdown do respetivo fornecimento onde será mostrada informação sobre este. Carregando no botão "Visualizar transportadores" é aberto um menu onde pode visualizar as informações sobre os transportadores desse fornecimento. Neste menu pode adiconar e remover transportadores, assim como editar o preço dos transportadores. É ainda possível alterar as informações sobre fornecimento em si carregando no botão "Editar detalhes".</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
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
import { faTruck, faGasPump, faOilCan, faChargingStation, faBolt, faSkullCrossbones, faBox, faPlus, faUpRightAndDownLeftFromCenter, faTrash, faLeaf, faTag, faCalendarXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faTruck, faGasPump, faOilCan, faChargingStation, faBolt, faSkullCrossbones, faBox, faPlus, faUpRightAndDownLeftFromCenter, faTrash, faLeaf, faTag, faCalendarXmark);

import http from "../../../http-common";
import { Loader } from "@googlemaps/js-api-loader"

export default {
	name: "Vehicles",
	mounted() {
        this.getUserInfo()
		this.getUserInventory();
        this.getUserWarehouses();
        this.getProducts();
        this.getTransporters();
	},
	data() {
		const toast = useToast()
        return {
            toast,
			user: {},
			inventory: [],
			inventoryLength: 1,
			selectedItem: {},
			map: {},
            newItemInfo: {
                distribution_center: '',
                license_plate: '',
                payload_capacity: '',
                resource_usage: '',
                average_emissions: '',
                fuel_type: '',
            },
            newItemTransporter: {
                transporter: '',
                price: '',
            },
            warehouses: [],
            selectedWarehouseNew: {capacity:'', address:{}},
            products: {},
            selectedProductNew: {id:''},
            transporters: {},
            selectedTansporter: {id:''},
            selectedItemTransportsLength: 0,
            selectedItemTransporter: '',
		};
	},
	methods: {
		initMaps() {
            const loader = new Loader({
                apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
                version: "weekly"
            });
            loader.load().then(() => {
                for (let item of this.inventory) {
                    let position = {lat: item.warehouse.address.latitude, lng: item.warehouse.address.longitude}
                    let itemMap = new google.maps.Map(document.getElementById("item-" + item.id), {
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
                })

                const marker = new google.maps.Marker({
                        position: position,
                        map: itemMap,
                        label: {
                            text: " ",
                            color: "#FFF"
                        }
                    }
                );
                }
            })
        },
		getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.user
        },
        getUserInventory() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.get(`/supplier/${userId}/inventory`, headers)
                .then((response) => {
                    if (response.status == 200) {
                        this.inventory = response.data;
						this.calculateInventoryLength()
                        this.initMaps()
                        console.log(this.inventory)
                    }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
        },
		calculateInventoryLength() {
			this.inventoryLength = Object.keys(this.inventory).length;
			return this.inventoryLength
		},
        getUserWarehouses() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.get(`/supplier/${userId}/warehouses`, headers)
                .then((response) => {
                    if (response.status == 200) {
                        this.warehouses = response.data;
						this.calculateWarehousesLength();
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
            }
        },
        calculateWarehousesLength() {
			return Object.keys(this.warehouses).length;
		},
        getItemInfo(item) {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.get(`/supplier/${userId}/inventory/${item}`, headers)
                .then((response) => {
                    if (response.status == 200) {
                        this.selectedItem = response.data;
                        this.selectedItem.id = item;
                        this. getItemTransportersLength()
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
            }
        },
        getItemTransportersLength(){
            this.selectedItemTransportsLength = Object.keys(this.selectedItem.transports).length;
            return this.selectedItemTransportsLength
        },
        getProducts() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken && userId){
                http.get(`/store/products?include_unbuyable=true`)
                .then((response) => {
                    if (response.status == 200) {
                        this.products = response.data.products;
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
            }
        },
        getTransporters() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            if (accessToken && userId){
                http.get(`/store/transporters`)
                .then((response) => {
                    if (response.status == 200) {
                        this.transporters = response.data;
                        this.changeAccordionsColor()
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
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
                rtl: false
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
                rtl: false
            });
        },
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
        },
        calculateExpirationTime(expiration_date) {
            let date = new Date(expiration_date);
            let today = new Date();
            var totalTime = date.getTime() - today.getTime();
            var totalDays = Math.ceil(totalTime / (1000 * 3600 * 24));

            return totalDays;
        },
        calculateDayDifference(day) {
            let date = new Date(day);
            let today = new Date();
            var totalTime = date.getTime() - today.getTime();
            var totalDays = Math.ceil(totalTime / (1000 * 3600 * 24));

            return totalDays;
        },
        changeAccordionsColor() {
            for(let item of this.inventory){
                if (this.calculateExpirationTime(item.expiration_date) < 10 && this.calculateExpirationTime(item.expiration_date) > 1) {
                    document.getElementById(String("item"+item.id)).style.backgroundColor = "#faee422b"
                }
                else if (this.calculateExpirationTime(item.expiration_date) <= 1) {
                    document.getElementById(String("item"+item.id)).style.backgroundColor = "#fc232350"
                }
            }
        },
        successfulNewItem() {
            this.getUserInventory();
            var closeEditModal = document.getElementById("closeNewItemModal");
            closeEditModal.click();
            this.successfulToast("Criado! O fornecimento foi criado com sucesso.")
        },
        successfulNewDetails() {
			var closeEditModal = document.getElementById("closeEditItemDetails");
            closeEditModal.click();
			this.getUserInventory();
			this.successfulToast("Atualizados! Os detalhes do fornecimento foram atualizados com sucesso.")
		},
        successfulRemoveItem() {
            var closeEditModal = document.getElementById("closeRemoveItem");
            closeEditModal.click();
            this.getUserInventory();
			this.successfulToast("Removido! O fornecimento foi removido com sucesso.")
        },
        successfulRemoveItemTransporter() {
            this.getItemInfo(this.selectedItem.id)
            this.getUserInventory();
			this.successfulToast("Removido! O transportador foi removido com sucesso.")
        },
        errorNewItem() {
            this.errorToast("Este produto já está a ser vendido neste armazém.")
            document.getElementById("inputProduct").classList.add("is-invalid")
        },
		newItem() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            let datetime1 = new Date(this.newItemInfo.production_date);
            let datetime2 = new Date(this.newItemInfo.expiration_date);
            if(this.calculateDayDifference(datetime1) < 0 && this.calculateDayDifference(datetime2) > 0) {
                if (accessToken && userId){
                    http.post(`/supplier/${userId}/inventory`, JSON.stringify({
                        product: this.newItemInfo.product,
                        warehouse: this.selectedWarehouseNew.id,
                        quantity: this.newItemInfo.quantity,
                        price: this.newItemInfo.price,
                        production_date: datetime1.toISOString(),
                        expiration_date: datetime2.toISOString()
                    }), headers)
                    .then((response) => {
                        console.log(response)
                        if (response.status == 200) {
                            this.successfulNewItem()
                        }
                        }).catch((error) => {
                            if(error.message == "Request failed with status code 409") {
                                this.errorNewItem()
                            };
                        })
                }
            }
            if(this.calculateDayDifference(datetime1) > 0) {
                this.errorToast("A data de produção deve ser anterior ou igual ao dia de hoje.")
                document.getElementById("newItemProductionDate").classList.add("is-invalid")
            }
            if(this.calculateDayDifference(datetime2) < 0) {
                this.errorToast("A data de expiração deve ser posterior ao dia de hoje.")
                document.getElementById("newExpirationDate").classList.add("is-invalid")
            }
            
		},
        editItemDetails(item) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.put(`/supplier/${userId}/inventory/${item}`, JSON.stringify({
					quantity: Number(document.getElementById("editItemQuantity").value),
					price: Number(document.getElementById("editItemPrice").value),
                	production_date: document.getElementById("editProductionDate").value,
                    expiration_date: document.getElementById("editExpirationDate").value,
				}), headers)
                .then((response) => {
                    if (response.status == 200) {
						this.getItemInfo(item);
                        this.successfulNewDetails();
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
            }
		},
        addTransporter(item, transporter) {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.post(`/supplier/${userId}/inventory/${item}/transports`, JSON.stringify({
                    transporter: transporter,
                    price: this.newItemTransporter.price,
                }), headers)
                .then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        this.getUserInventory()
                        this.getItemInfo(item)
                        this.successfulToast("Adicionado! Transportador adicionado ao fornecimento com sucesso.")
                    }
                    }).catch((error) => {
                        if(error.response.data.message == "This supply is already being shipped with this transporter. Update your pre-existing transportation option or select a new supply/transporter combination.") {
                            this.errorToast("Este transportador já se encontra associado a este fornecimento.")
                            document.getElementById("addTransporterItem").classList.add("is-invalid")
                        };
                    })
            }
        },
        editItemTransporter() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId) {
                http.put(`/supplier/${userId}/inventory/${this.selectedItem.id}/transports/${this.selectedItemTransporter.transporter.id}`,JSON.stringify({
                        price: document.getElementById("newItemTransporterPrice").value,
                    }), headers)
                    .then((response) => {
                        console.log(response)
                        if (response.status == 200) {
                            this.getItemInfo(this.selectedItem.id)
                            this.successfulToast("Atualizado! O preço do transportador foi atualizado com sucesso.")
                        }
                    }).catch(error => {
                            console.log(error)
                    }) 
            }
        },
        removeItemTransporter(transporter) {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId) {
                http.delete(`/supplier/${userId}/inventory/${this.selectedItem.id}/transports/${transporter}`, headers)
                    .then((response) => {
                        console.log(response)
                        if (response.status == 200) {
                            this.successfulRemoveItemTransporter();
                        }
                    }).catch(error => {
                            console.log(error)
                    }) 
            }
        },
		removeItem(item) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId) {
                http.delete(`/supplier/${userId}/inventory/${item}`, headers)
                    .then((response) => {
                        console.log(response)
                        if (response.status == 200) {
                            this.successfulRemoveItem();
                        }
                    }).catch(error => {
                            console.log(error)
                    }) 
            }
		},
        removeIsInvalid() {
            document.getElementById("addTransporterItem").classList.remove("is-invalid");
            document.getElementById("inputProduct").classList.remove("is-invalid");
            document.getElementById("newItemProductionDate").classList.remove("is-invalid")
            document.getElementById("newExpirationDate").classList.remove("is-invalid");
        },
	}	
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
	.btn-primary{
        background-color: #5E9F88;
        border-color: white;
    }
    .greenly-link {
        color: #5e9f88;
    }
    .form-control {
        appearance: auto!important;
    }
    :focus {
        outline: 0 !important;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
    }
    *:focus {
        outline: none !important;
    }
    .accordion-button:not(.collapsed) {
        background-color: white !important;
        color: black !important;
    }
</style>