<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row class="mb24">
                <v-col class="fs24 bold" data-unq="notification-label-campaignName">
                    {{item.campaign_name}}
                </v-col>
                <v-col class="d-flex justify-end align-end" data-unq="notification-label-status">
                    <div v-if="item.status == 1">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4"
                            :color="statusMaster('active')"
                        >Active</v-btn>
                    </div>
                    <div v-else-if="item.status == 2">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4"
                            :color="statusMaster('finished')"
                        >Finished</v-btn>
                    </div>
                    <div v-else-if="item.status == 3">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4"
                            :color="statusMaster('cancelled')"
                        >Cancelled</v-btn>
                    </div>
                    <div v-else-if="item.status == 5">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4"
                            :color="statusMaster('draft')"
                        >Draft</v-btn>
                    </div>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn :data-unq="`notification-button-actionButton`" icon v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item :data-unq="`notification-button-update`" v-privilege="'pnt_upd'" :to="'/campaign/push-notification/update/'+item.id" v-if="item.status == 5">
                                <v-list-item-content>
                                    <v-list-item-title>Update</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon>mdi-open-in-new</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            <div class="hr-menu" v-if="item.status == 5"/>
                            <v-list-item :data-unq="`notification-button-cancel`" @click="setCancelState(true, item.id)" v-if="item.status == 5" v-privilege="'pnt_can'">
                                <v-list-item-content>
                                    <v-list-item-title>Cancel</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="hr-menu" v-if="item.status == 5"/>
                            <v-list-item :data-unq="`notification-button-history`" @click="seeHistory(item.id)">
                                <v-list-item-content>
                                    <v-list-item-title>See History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <DetailRowNew :data-unq="`notification-label-code`" :name="'Code'" :value="item.code"/>
                </v-col>
                <v-col cols="12" md="6">
                    <DetailRowNew :data-unq="`notification-label-redireqTo`" :name="'Redirect To'" :value="item.redirect.value_name"/>
                </v-col>
                <v-col cols="12" :md="item.redirect_to == 4?'12':'6'" class="-mt24" v-if="item.redirect_to != 3 && item.redirect_to != 5 && item.redirect_to != 6">
                    <DetailRowNew :data-unq="`notification-label-redireqValue`" :name="item.redirect.name" v-if="item.redirect_to == 4" :value="item.redirect_value" :crossURL="item.redirect_value"/>
                    <DetailRowNew :data-unq="`notification-label-itemCategory`" :name="item.redirect.name" v-else-if="item.redirect_to == 2" :value="item.redirect.value.code+' - '+item.redirect.value.name"/>
                    <DetailRowNew :data-unq="`notification-label-item`" :name="item.redirect.name" v-else :value="item.redirect.value.code+' - '+item.redirect.value.description"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :data-unq="`notification-label-scheduledAt`" :name="'Schedule Push Notification'" :value="$moment(item.scheduled_at).format('DD-MM-YYYY HH:mm:ss')"/>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <DetailRowNew :data-unq="`notification-label-region`" :name="'Region'" :value="arrayToString(item.region_names)" :align="true"/>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <DetailRowNew :data-unq="`notification-label-archetype`" :name="'Archetype'" :value="arrayToString(item.archetype_names)" :align="true"/>
                </v-col>
            </v-row>
        </div>
        <div class="box-title fs16 bold">
            Push Notification Info
        </div>
        <div class="box-body">
            <v-row>
                <v-col cols="12" md="12">
                    <DetailRowNew :data-unq="`notification-label-notificationTitle`" :name="'Notification Title'" :value="item.title ? item.title : '-'" :align="true"/>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <DetailRowNew :data-unq="`notification-label-notificationMessage`" :name="'Message'" :value="item.message ? item.message : '-'" :align="true"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :data-unq="`notification-label-successSent`" :name="'Success Sent'" :value="item.success_sent ? item.success_sent : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :data-unq="`notification-label-open`" :name="'Open'" :value="item.opened ? item.opened : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :data-unq="`notification-label-conversion`" :name="'Conversion'" :value="item.conversion ? item.conversion : '-'"/>
                </v-col>
            </v-row>
        </div>
        <v-dialog
            :data-unq="`notification-action-dialogCancel`"
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
                        :data-unq="`notification-input-cancelNote`"
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
                        :data-unq="`notification-action-saveCancel`"
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
        <AuditLogNew data-unq="notification-action-history" :data="detail_notification.dataAuditLog"/>
        <LoadingBar data-unq="notification-action-loading" :value="detail_notification.overlay"/>
    </v-container>
</template>
<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "PushNotificationDetail",
        mounted() {
            this.fetchNotificationDetail({id: this.$route.params.id});
        },
        computed: {
            ...mapState({
                detail_notification: state => state.notification.detail_notification,
                item: state => state.notification.detail_notification.item,
                cancel_notification: state => state.notification.cancel_notification,
            })
        },
        methods: {
            ...mapActions([
                'cancelNotification',
                'fetchNotificationDetail',
            ]),
            arrayToString(arr) {
                return String(arr)
            },
            seeHistory(id) { // for see the history
                this.detail_notification.dataAuditLog = {
                    model : true,
                    id: id,
                    type: "push_notification"
                }
            },
            // For Set State Cancel Notification
            setCancelState(handler, id) {
                this.$store.commit("setNotificationCancelModal", handler)
                this.$store.commit("setNotificationCancelNote", '')
                this.$store.commit("setNotificationCancelError", '')
                this.$store.commit("setNotificationCancelPosition", 'detail')
                if (id) {
                    this.$store.commit("setNotificationCancelID", id)
                }
            },
        },
    }
</script>