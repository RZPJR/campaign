<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="-mb24">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                :data-unq="`itemSection-input-search`"
                                dense
                                v-model="filter.search"
                                outlined
                                filled
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                prepend-inner-icon="search"
                            >
                            </v-text-field>
                        </template>
                       <span>Search by code and name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row>
                <v-col>
                    Filter 
                    <v-btn 
                        :data-unq="`itemSection-button-hide`"
                        depressed
                        x-small
                        @click="filterDropdown = !filterDropdown"
                        v-if="filterDropdown"
                        class="no-caps fs12"
                    >
                        Hide
                        <v-icon
                            right
                        >
                            mdi-chevron-up
                        </v-icon>
                    </v-btn>
                    <v-btn 
                        :data-unq="`itemSection-button-show`"
                        depressed
                        x-small
                        @click="filterDropdown = !filterDropdown"
                        v-else
                        class="no-caps fs12"
                    >
                        Show
                        <v-icon
                            right
                        >
                            mdi-chevron-down
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="filterDropdown">
                <v-col cols="12" md="3">
                    <SelectArea 
                        :data-unq="`itemSection-filter-region`"
                        @selected="regionSelected"
                        :dense="true"
                        :norequired="true"
                        :aux_data="2"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArchetype
                        :data-unq="`itemSection-filter-archetype`"
                        @selected="archetypeSelected"
                        :norequired="true"
                        :aux_data="2"
                        :dense="true"
                    ></SelectArchetype>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        :data-unq="`itemSection-filter-status`"
                        v-model="filter.status"
                        :items="itemsection_list.status_options"
                        @change="fetchItemSectionList()"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col class="flex-align-end">
                    <v-row>
                        <v-col>
                            <v-btn
                                :data-unq="`itemSection-button-createItemSection`"
                                depressed
                                color="#50ABA3"
                                :to="{ name: 'ItemSectionCreate' }"
                                class="no-caps"
                                v-privilege="'isc_crt'" 
                            >
                                <span class="text-white bold">
                                    Create Item Section
                                </span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="itemsection_list.table_header"
                :items="itemsection_list.data"
                :loading="itemsection_list.isLoading"
                :items-per-page="pagination.rows_per_page"
                :server-items-length="pagination.total_items"
                @update:items-per-page="getItemPerPage"
                @update:page="getPagination"
                :footer-props="footerProps"
            >
            <template v-slot:item="props">
                    <tr style="height:86px">
                        <td :data-unq="`itemSection-value-name-${props.index}`">
                            {{ props.item.name }}<br>
                            <span 
                                class="second-color" 
                                :data-unq="`itemSection-value-code-${props.index}`"
                            >{{ props.item.code }}</span>
                        </td>
                        <td :data-unq="`itemSection-value-type-${props.index}`">
                            {{ props.item.type == 1? 'Item Section':'Item Recommendation' }}
                        </td>
                        <td :data-unq="`itemSection-value-region-${props.index}`">
                            <div v-if="props.item.region_names && props.item.region_names.length > 1">
                                <v-tooltip color="black" top>
                                    <template v-slot:activator="{ on: tooltip }">
                                        <span v-on="{ ...tooltip }"> {{ props.item.region_names[0] }}... </span>
                                    </template>
                                    <span> 
                                        {{ arrayToString(props.item.region_names) }} 
                                    </span>
                                </v-tooltip>
                            </div>
                            <div v-else>
                                {{ arrayToString(props.item.region_names) }}
                            </div>
                        </td>
                        <td :data-unq="`itemSection-value-archetype-${props.index}`">
                            <div v-if="props.item.archetype_names && props.item.archetype_names.length > 1">
                                <v-tooltip color="black" top>
                                    <template v-slot:activator="{ on: tooltip }">
                                        <span v-on="{ ...tooltip }"> {{ props.item.archetype_names[0] }}... </span>
                                    </template>
                                    <span> 
                                        {{ arrayToString(props.item.archetype_names) }} 
                                    </span>
                                </v-tooltip>
                            </div>
                            <div v-else>
                                {{ arrayToString(props.item.archetype_names) }}
                            </div>
                        </td>
                        <td :data-unq="`itemSection-value-startAt-${props.index}`">
                            {{ props.item.start_at | moment("DD/MM/YYYY") }} <br>
                            {{ props.item.start_at | moment("HH:mm") }}
                        </td>
                        <td :data-unq="`itemSection-value-finishAt-${props.index}`">
                            {{ props.item.finish_at | moment("DD/MM/YYYY") }} <br>
                            {{ props.item.finish_at | moment("HH:mm") }}
                        </td>
                        <td :data-unq="`itemSection-value-status-${props.index}`">
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 2">
                                <v-chip
                                    :color="statusMaster('finished')"
                                ><span class="pa-md-2">Finished</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 5">
                                <v-chip
                                    :color="statusMaster('draft')"
                                ><span class="pa-md-2">Draft</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 7">
                                <v-chip
                                    :color="statusMaster('archived')"
                                ><span class="pa-md-2">Archived</span></v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        :data-unq="`itemSection-button-actionButton-${props.index}`"
                                        icon
                                        v-on="{ ...menu }"
                                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item  
                                        :data-unq="`itemSection-button-detail-${props.index}`"
                                        :to="{name: 'ItemSectionDetail', 
                                        params: { id: props.item.id }}" 
                                        v-privilege="'isc_rdd'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>mdi-open-in-new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <div v-if="props.item.status==5">
                                        <hr/>
                                    </div>
                                    <v-list-item  
                                        :data-unq="`itemSection-button-update-${props.index}`"
                                        :to="{name: 'ItemSectionUpdate', 
                                        params: { id: props.item.id }}" 
                                        v-if="props.item.status==5"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Update</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>mdi-open-in-new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <div v-if="props.item.status==1 || props.item.status==5">
                                        <hr/>
                                    </div>
                                    <v-list-item 
                                        :data-unq="`itemSection-button-archive-${props.index}`"
                                        v-if="props.item.status==1 || props.item.status==5" 
                                        @click="handleArchiveModal(true, props.item.id)" 
                                        v-privilege="'isc_arc'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Archive</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ filter.search }}" found no results.
                </v-alert>
            </v-data-table>
        </div>
        <v-dialog
            :data-unq="`itemSection-action-modelDialog`"
            v-model="archive.archive_modal"
            persistent
            max-width="470px"
        >
            <v-card class="OpenSans">
                <v-card-title>
                    <span class="text-title-modal">Archive Item Section</span>
                </v-card-title>
                <v-card-text>
                    <span class="fs16 mt-1">Why was this item section archived?</span>
                    <v-textarea
                        name="note"
                        v-model="archive.note"
                        :counter="100"
                        maxlength="100"
                        outlined
                        class="mt-6"
                        rows="3"
                        :error-messages="archive.error.note"
                    >
                        <template v-slot:label>
                            Note<span class="text-red">*</span>
                        </template>
                    </v-textarea>
                </v-card-text>
                <v-card-actions class="pb-4 -mt6">
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="handleArchiveModal(false)"
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="main-btn"
                    >
                        <span class="text-black80">Cancel</span>
                    </v-btn>
                    <v-btn
                        depressed
                        color="#50ABA3"
                        class="main-btn white--text"
                        @click="archiveItemSection()"
                    >Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
    import { mapState, mapActions } from "vuex";
    export default {
        name: "ItemSectionList",
        data() {
            return {
                filterDropdown : false
            }
        },
        created() {
            this.$store.commit("setDefaultFilterItemSectionList")
            this.$store.commit("resetPagination")
        },
        computed: {
            ...mapState({
                itemsection_list: state => state.itemsection.itemsection_list,
                filter: state => state.itemsection.itemsection_list.filter,
                archive: state => state.itemsection.archive,
                pagination: state => state.pagination.pagination,
            }),
            footerProps() {
                return {
                    'items-per-page-options':[10,15,20,25],
                    'page-text': `${(this.pagination.page-1)*this.pagination.rows_per_page+1}
                                    - ${Math.min(this.pagination.page*this.pagination.rows_per_page,this.pagination.total_items)} 
                                    of ${this.pagination.total_items}`,
                };
            },
        },
        mounted() {
            this.fetchItemSectionList()
        },
        methods: {
            ...mapActions([
                "fetchItemSectionList",
                "archiveItemSection"
            ]),
            // Convert Array to String
            arrayToString(arr) {
                return String(arr)
            },
            //For Filter by Area
            regionSelected(d){
                this.$store.commit("setFilterItemSectionList", {...this.filter, region: "",})
                if(d){
                    this.$store.commit("setFilterItemSectionList", {
                        ...this.filter,
                        region: d.id,
                    })
                }
                this.getPagination(1)
                this.fetchItemSectionList()
            },
            //For Filter by Archetype
            archetypeSelected(d) {
                this.$store.commit("setFilterItemSectionList", {...this.filter, archetype: "",})
                if (d) {
                    this.$store.commit("setFilterItemSectionList", {
                        ...this.filter,
                        archetype: d.id,
                    })
                }
                this.getPagination(1)
                this.fetchItemSectionList()
            },
            // For Handling Archive
            handleArchiveModal(handler, id) {
                this.$store.commit("setItemSectionShowArchiveModal", handler)
                this.$store.commit("setItemSectionArchivePosition", 'list')
                this.$store.commit("setItemSectionArchiveNote", '')
                this.$store.commit("setItemSectionArchiveError", '')
                if (id) {
                    this.$store.commit("setItemSectionArchiveID", id)
                }
            },
            // Count all data for paggination
            getItemPerPage(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    rows_per_page: val,
                })
                this.fetchItemSectionList()
            },
            // For paggination
            getPagination(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    page: val,
                })
                this.fetchItemSectionList()
            },
        },
        watch: {
            'filter.search': { // to filter by search box
                handler: function (val) {
                    let self = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        self.fetchItemSectionList()
                    }, 1000);
                },
                deep: true
            },
        },
    }
</script>