<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col :data-unq="`itemSection-input-name`" class="fs24 bold">
                    {{data.name}}
                </v-col>
                <v-col :data-unq="`itemSection-input-status`" class="d-flex justify-end align-end">
                    <div v-if="data.status == 1">
                        <v-btn
                            elevation="0"
                            rounded
                            depressed
                            small
                            class="no-caps mb4"
                            :color="statusMaster('active')"
                        >
                            Active
                        </v-btn>
                    </div>
                    <div v-if="data.status == 2">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4 w104"
                            :color="statusMaster('finished')"
                        >
                            Finished
                        </v-btn>
                    </div>
                    <div v-if="data.status == 5">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4 w104"
                            :color="statusMaster('draft')"
                        >
                            Draft
                        </v-btn>
                    </div>
                    <div v-if="data.status == 7">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4 w104"
                            :color="statusMaster('archived')"
                        >
                            Archived
                        </v-btn>
                    </div>
                    <v-menu offset-y >
                        <template v-slot:activator="{ on }">
                            <v-btn :data-unq="`itemSection-input-actionButton`" icon v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item 
                                :data-unq="`itemSection-button-update`"
                                v-privilege="'isc_upd'" 
                                :to="{name: 'ItemSectionUpdate', 
                                params: { id: data.id }}" 
                                v-if="data.status == 5"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Update</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon>mdi-open-in-new</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            <div class="hr-menu" v-if="data.status == 5"/>
                            <v-list-item 
                                :data-unq="`itemSection-button-archive`"
                                v-if="data.status==1 || data.status==5" 
                                @click="handleArchiveModal(true, data.id)"  
                                v-privilege="'isc_arc'"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="hr-menu" v-if="data.status==1 || data.status == 5"/>
                            <v-list-item :data-unq="`itemSection-button-history`" @click="seeHistory()">
                                <v-list-item-content>
                                    <v-list-item-title>History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row class="-mb61">
                <v-col cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'Code'" :value="data.code"/>
                </v-col>
                <v-col cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'Type'" :value="data.type == 1? 'Item Section':'Item Recommendation'"/>
                </v-col>
                <v-col cols="12" v-if="data.type == 1" md="6" class="-mb24">
                    <DetailRowNew :name="'Item Section Sequence'" :value="data.sequence"/>
                </v-col>
                <v-col cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'Start Time'" :value="data.start_at | moment('DD/MM/YYYY HH:mm')"/>
                </v-col>
                <v-col cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'End Time'" :value="data.finish_at | moment('DD/MM/YYYY HH:mm')"/>
                </v-col>
                <v-col cols="12" class="-mb24">
                    <DetailRowNew :name="'Region'" :value="arrayToString(data.region_names)" :align="true"/>
                </v-col>
                <v-col cols="12" class="mb24">
                    <DetailRowNew :name="'Archetype'" :value="arrayToString(data.archetype_names)" :align="true"/>
                </v-col>
            </v-row>
            <v-row v-if="data.type == 1">
                <div class="ma-3">
                    <div class="text-black60 mb8">
                        Background Image :
                    </div>
                    <v-img
                        class="rounded-form"
                        height="347"
                        width="360"
                        :src="data.background_image"
                    ></v-img>
                </div>
            </v-row>
        </div>
        <div class="box-header-table">
            Items
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="table_header"
                :items="data.items"
                :hide-default-footer="true"
                :items-per-page="-1"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{ props.index + 1 }}</td>
                        <td>{{ props.item.code }} - {{ props.item.description }}</td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <v-dialog
            :data-unq="`itemSection-action-modalDialog`"
            modelDialog
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
                        :data-unq="`itemSection-input-archiveNote`"
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
                        :data-unq="`itemSection-button-archiveCancel`"
                        @click="handleArchiveModal(false)"
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="main-btn"
                    >
                        <span class="text-black80">Cancel</span>
                    </v-btn>
                    <v-btn
                        :data-unq="`itemSection-button-SaveArchive`"
                        depressed
                        color="#50ABA3"
                        class="main-btn white--text"
                        @click="archiveItemSection()"
                    >Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <AuditLogNew :data="dataAuditLog"/>
    </v-container>
</template>
<script>
    import { mapState, mapActions } from "vuex";
    export default {
        name: "ItemSectionDetail",
        data() {
            return {
                dataAuditLog: {},
            }
        },
        computed: {
            ...mapState({
                data: state => state.itemsection.itemsection_detail.data,
                archive: state => state.itemsection.archive,
                table_header: state => state.itemsection.itemsection_detail.table_header,
            }),
        },
        methods:{
            ...mapActions([
                "fetchItemSectionDetail",
                "archiveItemSection"
            ]),
            //Convert arry to string
            arrayToString(arr) {
                return String(arr)
            },
            // For Handling Archive 
            handleArchiveModal(handler, id) {
                this.$store.commit("setItemSectionShowArchiveModal", handler)
                this.$store.commit("setItemSectionArchivePosition", 'detail')
                this.$store.commit("setItemSectionArchiveNote", '')
                this.$store.commit("setItemSectionArchiveError", '')
                if (id) {
                    this.$store.commit("setItemSectionArchiveID", id)
                }
            },
            //For geting history data
            seeHistory() {
                this.dataAuditLog = {
                    model: true,
                    id: this.$route.params.id,
                    type: "item_section"
                }
            },
        },
        mounted() {
            this.fetchItemSectionDetail(this.$route.params.id)
        },
    }
</script>