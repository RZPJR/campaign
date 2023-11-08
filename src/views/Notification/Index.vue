<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row class="-mb38">
                <v-col cols="12" md="4" class="-mb24">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                data-unq="notification-input-search"
                                dense
                                v-model="filter.search"
                                outlined
                                filled
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                prepend-inner-icon="search"
                            ></v-text-field>
                        </template>
                        <span>Search by code and name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="filter.model?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        :data-unq="`notification-button-showFilter`"
                        depressed
                        x-small
                        @click="filter.model = !filter.model"
                        v-if="filter.model"
                        class="no-caps fs12"
                    >Hide<v-icon right>mdi-chevron-up</v-icon></v-btn>
                    <v-btn 
                        :data-unq="`notification-button-hideFilter`"
                        depressed
                        x-small
                        @click="filter.model = !filter.model"
                        v-else
                        class="no-caps fs12"
                    >Show<v-icon right>mdi-chevron-down</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="filter.model">
                <v-col cols="12" md="3">
                    <SelectArea
                        :data-unq="`notification-filter-region`"
                        :norequired="true"
                        @selected="regionSelected"
                        label="Region"
                        :aux_data="2"
                        :dense="true"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <v-menu
                        :data-unq="`notification-filter-scheduleDateModel`"
                        ref="menu"
                        v-model="schedule_date.model"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-text-field
                                    :data-unq="`notification-filter-scheduleDateInput`"
                                    prepend-inner-icon="mdi-calendar"
                                    outlined
                                    maxlength="24"
                                    v-model="schedule_date.input"
                                    dense
                                >
                                    <template v-slot:label>
                                        Schedule Date
                                    </template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker
                            :data-unq="`notification-filter-scheduleDate`"
                            range
                            v-model="schedule_date.date"
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="schedule_date.model = false,fetchNotification()"
                            >OK</v-btn>    
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        :data-unq="`notification-filter-status`"
                        v-model="filter.status"
                        :items="notification_list.status_options"
                        @change="fetchNotification()"
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
                    <v-btn
                        :data-unq="`notification-button-create`"
                        depressed
                        color="#50ABA3"
                        :to="{ name: 'NotificationCreate' }"
                        class="no-caps bold"
                        v-privilege="'pnt_crt'"
                    >
                        <span class="text-white bold">
                            Create Push Notification
                        </span>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="table_header"
                :items="notification_list.data"
                :loading="notification_list.isLoading"
                :items-per-page="pagination.rows_per_page"
                :server-items-length="pagination.total_items"
                @update:items-per-page="getItemPerPage"
                @update:page="getPagination"
                :footer-props="footerProps"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td :data-unq="`notification-value-scheduledAt-${props.index}`">{{ $moment(props.item.scheduled_at).format('DD-MM-YYYY HH:mm:ss') }}</td>
                        <td :data-unq="`notification-value-campaignName-${props.index}`">
                            {{ props.item.campaign_name }}
                            <br>
                            <div class="text-black60" :data-unq="`notification-value-code-${props.index}`">
                                {{ props.item.code }}
                            </div>
                        </td>
                        <td :data-unq="`notification-value-regionName-${props.index}`">
                            <div v-if="props.item.region_names.length > 1">
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
                        <td :data-unq="`notification-value-archetype-${props.index}`">
                            <div v-if="props.item.archetype_names.length > 1">
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
                        <td :data-unq="`notification-value-redirectTo-${props.index}`">
                            <div v-if="props.item.redirect_to == 4">
                                <a :href="props.item.redirect_value" target="_blank" rel="noopener noreferrer">
                                    {{ props.item.redirect.value_name }}
                                </a>
                            </div>
                            <div v-else-if="props.item.redirect_to == 1">
                                {{ props.item.redirect.value.code }} - {{ props.item.redirect.value.description }}
                            </div>
                            <div v-else-if="props.item.redirect_to == 2">
                                {{ props.item.redirect.value.name }}
                            </div>
                            <div v-else>
                                {{ props.item.redirect.value_name }}
                            </div>
                        </td>
                        <td :data-unq="`notification-value-successSent-${props.index}`">{{ props.item.success_sent ? props.item.success_sent : '-' }}</td>
                        <td :data-unq="`notification-value-open-${props.index}`">{{ props.item.opened ? props.item.opened : '-' }}</td>
                        <td :data-unq="`notification-value-conversion-${props.index}`">{{ props.item.conversion ? props.item.conversion : '-' }}</td>
                        <td :data-unq="`notification-value-status-${props.index}`">
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                    :text-color="statusMasterText('active')"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-else-if="props.item.status == 2">
                                <v-chip
                                    :color="statusMaster('finished')"
                                    :text-color="statusMasterText('finished')"
                                ><span class="pa-md-2">Finished</span></v-chip>
                            </div>
                            <div v-else-if="props.item.status == 3">
                                <v-chip
                                    :color="statusMaster('cancelled')"
                                    :text-color="statusMasterText('cancelled')"
                                ><span class="pa-md-2"> Cancelled </span></v-chip>
                            </div>
                            <div v-else-if="props.item.status == 5">
                                <v-chip
                                    :color="statusMaster('draft')"
                                    :text-color="statusMasterText('draft')"
                                ><span class="pa-md-2">Draft</span></v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <template >
                                        <v-btn
                                            :data-unq="`notification-button-actionButton-${props.index}`"
                                            icon
                                            v-on="{ ...menu }"
                                        >  
                                            <v-icon dark>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item 
                                        :data-unq="`notification-button-detail-${props.index}`" 
                                        v-privilege="'pnt_rdd'" 
                                        :to="'/campaign/push-notification/detail/'+props.item.id"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>mdi-open-in-new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <div class="hr-menu" v-if="props.item.status == 5"/>
                                    <v-list-item 
                                        :data-unq="`notification-button-update-${props.index}`" 
                                        v-privilege="'pnt_upd'" 
                                        :to="'/campaign/push-notification/update/'+props.item.id" 
                                        v-if="props.item.status == 5"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Update</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>mdi-open-in-new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <div class="hr-menu" v-if="props.item.status == 5"/>
                                    <v-list-item 
                                        :data-unq="`notification-button-cancel-${props.index}`" 
                                        @click="setCancelState(true,props.item.id)" 
                                        v-if="props.item.status==5" 
                                        v-privilege="'pnt_can'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Cancel</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <v-dialog
            v-model="cancel_notification.modal"
            persistent
            max-width="470px"
        >
            <v-card class="OpenSans">
                <v-card-title>
                    <span class="text-title-modal">Cancel Push Notification</span>
                </v-card-title>
                <v-card-text>
                    <span class="fs16 mt-1">Why was this push notification cancelled?</span>
                    <v-textarea
                        data-unq="notification-input-cancelNote"
                        name="note"
                        v-model="cancel_notification.note"
                        :counter="100"
                        maxlength="100"
                        outlined
                        :error-messages="cancel_notification.error.note"
                        required
                        class="mt-6"
                        rows="3"
                    >
                        <template v-slot:label>
                            Note<span style="color:red">*</span>
                        </template>
                    </v-textarea>
                </v-card-text>
                <v-card-actions class="pb-4 -mt6">
                    <v-spacer></v-spacer>
                    <v-btn
                        :data-unq="`notification-button-cancelCancel`"
                        @click="setCancelState(false)"
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="main-btn"
                    >
                        <span class="text-black80">Cancel</span>
                    </v-btn>
                    <v-btn
                        :data-unq="`notification-button-saveCancel`"
                        depressed
                        color="#50ABA3"
                        class="main-btn white--text"
                        @click="cancelNotification()"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: "PushNotificationList",
        computed: {
            ...mapState({
                notification_list: state => state.notification.notification_list,
                filter: state => state.notification.notification_list.filter,
                schedule_date: state => state.notification.notification_list.filter.schedule_date,
                notification_list: state => state.notification.notification_list,
                table_header: state => state.notification.notification_list.table_header,
                cancel_notification: state => state.notification.cancel_notification,
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
        created() {
            this.$store.commit("setDefaultFilterNotificationList")
            this.$store.commit("resetPagination")
        },
        mounted() {
            this.getDate()
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchNotification()
                }
            });
        },
        methods: {
            ...mapActions ([
                'fetchNotification',
                'cancelNotification',
            ]),
            arrayToString(arr) {
                return String(arr)
            },
            // For get default date this month
            getDate() {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
                var end = new Date(date.getFullYear(), date.getMonth()+1, 1);
                this.schedule_date.date = [firstDay.toISOString().substr(0, 10), end.toISOString().substr(0, 10)]
                this.getPagination(1)
                this.fetchNotification()
            },
            // For select region filter
            regionSelected(d) {
                this.filter.region = ''
                if (d) {
                    this.filter.region = d.id
                }
                this.getPagination(1)
                this.fetchNotification()
            },
            // For Set State Notification
            setCancelState(handler, id) {
                this.$store.commit("setNotificationCancelModal", handler)
                this.$store.commit("setNotificationCancelNote", '')
                this.$store.commit("setNotificationCancelError", '')
                this.$store.commit("setNotificationCancelPosition", 'list')
                if (id) {
                    this.$store.commit("setNotificationCancelID", id)
                }
            },
            // Count all data for paggination
            getItemPerPage(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    rows_per_page: val,
                })
                this.fetchNotification()
            },
            // For paggination
            getPagination(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    page: val,
                })
                this.fetchNotification()
            },
        },
        watch: {
            // For filter by Search Box
            'filter.search': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){ 
                        that.fetchNotification()
                    }, 1000);
                },
                deep: true
            },
            // For filter by date input format
            'schedule_date.input': {
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.schedule_date.date[0] = this.$moment(val).format('YYYY-MM-DD')
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0, 10)
                            let date2 = val.substr(14, 23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                this.schedule_date.date[0] = this.$moment(date1).format('YYYY-MM-DD')
                                this.schedule_date.date[1] = this.$moment(date2).format('YYYY-MM-DD')
                                if (this.schedule_date.date.length == 2) {
                                    this.fetchNotification()
                                }
                            }
                        }
                    }
                },
                deep: true
            },
            // For filter by date input value
            'schedule_date.date': {
                handler: function (val) {
                    if (val) {
                        this.schedule_date.input = this.formatDateRange(val)
                    }
                },
                deep: true
            },
        },
    }
</script>