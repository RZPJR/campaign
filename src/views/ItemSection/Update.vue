<template>
    <v-container fill-height class="main-container">
        <LoadingBar :value="overlay"/>
        <div class="box-title fs16 bold">
            Basic Info
        </div>
        <div class="box-body">
            <v-row>
                <v-col cols="12" md="12" class="-mt24">
                    <div class="d-flex fs14">
                        <div class="mt20 mr20" :class="form.type == 1?'text-secondary':''">Item Section</div>
                        <div>
                            <v-switch
                                v-model="form.type"
                                inset
                                :true-value="2"
                                disabled
                                data-unq="itemSection-button-type"
                                :false-value="1"
                                color="dummy"
                                class="switch"
                            ></v-switch>
                        </div>
                        <div class="mt20 ml8" :class="form.type == 2?'text-secondary':''">Item Recommendation
                            <v-tooltip top>
                                <template v-slot:activator="{ on: tooltip }">
                                    <span v-on="{ ...tooltip }">
                                        <span
                                            v-on="{ ...tooltip }"
                                        >
                                            <span><v-icon small>info</v-icon></span>
                                        </span>
                                    </span>
                                </template>
                                <span>To Show Item Recommendation on Search and Item Detail Page</span>
                            </v-tooltip>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="code"
                        data-unq="itemSection-input-code"
                        v-model="form.code"
                        required
                        outlined
                        dense
                        disabled
                        :error-messages="error.code"
                    >
                        <template v-slot:label>
                            Item Section Code<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        data-unq="itemSection-input-name"
                        name="name"
                        v-model="form.name"
                        required
                        outlined
                        dense
                        :error-messages="error.name"
                        :counter="30"
                        maxlength="30"
                    >
                        <template v-slot:label>
                            Item Section Name<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col v-if="form.type == 1" cols="12" md="6" class="-mt24">
                    <v-select
                        data-unq="itemSection-input-sequence"
                        v-model="form.sequence"
                        :items="sequenceNumber"
                        outlined
                        dense
                        required
                        :error-messages="error.sequence"
                    >
                        <template v-slot:label>
                            Item Section Sequence<span class="text-red">*</span>
                        </template>
                    </v-select>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <MultiSelectAreaCheckbox
                        :data-unq="`itemSection-input-region`"
                        @selected="regionSelected"
                        :error="error.regions"
                        :area="form.region"
                        :dense="true"
                        :aux_data="2"
                    ></MultiSelectAreaCheckbox>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <MultiSelectArcheTypeCheckbox
                        :data-unq="`itemSection-input-archetype`"
                        @selected="archetypeSelected"
                        :error="error.archetypes"
                        :archeType="form.archetype"
                        :dense="true"
                        :disbled="false"
                        :aux_data="2"
                    ></MultiSelectArcheTypeCheckbox>
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="form.type == 1">
                    <UploadImageCustomize 
                        :data-unq="`itemSection-input-uploadImage`"
                        :minWidth="360"
                        :minHeight="347"
                        :maxSize="1000"
                        :forImgName="form.name"
                        :imageFromUpdate="form.background_image"
                        :errorMsg="error.background_image"
                        :type="'product-group'"
                        :extention="'jpeg'"
                        :accept="'image/jpeg,image/jpg'"
                    ></UploadImageCustomize>
                </v-col>
            
            </v-row>
        </div>
        <div class="box-title fs16 bold">
            Period
        </div>
        <div class="box-body">
            <v-row class="mt24">
                <v-col cols="12" md="6">
                    <v-card elevation="0" outlined>
                        <v-card-text>
                            <div class="fs16 text-black">Start Time</div>
                        </v-card-text>
                        <v-card-text class="-mt12 -mb10">
                            <v-row>
                                <v-col>
                                    <v-menu
                                        :data-unq="`itemSection-input-startAtModel`"
                                        ref="menu"
                                        v-model="date.start_date.model"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <div v-on="on">
                                                <v-text-field
                                                    :data-unq="`itemSection-input-startAt`"
                                                    name="start_at"
                                                    prepend-inner-icon="mdi-calendar"
                                                    outlined
                                                    v-model="date.start_date.input"
                                                    maxlength="10"
                                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 45"
                                                    :error-messages="error.start_at"
                                                    clearable
                                                    @click:clear="date.start_date.input = ''"
                                                    dense
                                                >
                                                    <template v-slot:label>
                                                        Start Date<span class="text-red">*</span>
                                                    </template>
                                                </v-text-field>
                                            </div>
                                        </template>
                                        <v-date-picker
                                            v-model="date.start_date.input"
                                            @input="date.start_date.model = false"
                                            :min="date.current_date"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col>
                                    <v-menu
                                        :data-unq="`itemSection-input-startTimeModel`"
                                        ref="menuTime"
                                        v-model="date.start_time.model"
                                        :close-on-content-click="false"
                                        :return-value.sync="date.start_time.input"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                :data-unq="`itemSection-input-startTime`"
                                                name="start_time"
                                                prepend-inner-icon="mdi-clock-outline"
                                                outlined
                                                clearable
                                                maxlength="5"
                                                onkeypress="return event.charCode >= 48 && event.charCode <= 58"
                                                @click:clear="date.start_time.input = ''"
                                                v-model="date.start_time.input"
                                                :error-messages="error.start_at"
                                                dense
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                <template v-slot:label>
                                                    Start Time<span class="text-red">*</span>
                                                </template>
                                            </v-text-field>
                                        </template>
                                        <v-time-picker
                                            format="24hr"
                                            :min="checkTimeStart"
                                            v-if="date.start_time.model"
                                            v-model="date.start_time.input"
                                            full-width
                                            @click:minute="$refs.menuTime.save(date.start_time.input)"
                                        ></v-time-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card elevation="0" outlined>
                        <v-card-text>
                            <div class="fs16 text-black">End Time</div>
                        </v-card-text>
                        <v-card-text class="-mt12 -mb10">
                            <v-row>
                                <v-col>
                                    <v-menu
                                        :data-unq="`itemSection-input-finishAtModel`"
                                        ref="menu"
                                        v-model="date.finish_date.model"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <div v-on="on">
                                                <v-text-field
                                                    :data-unq="`itemSection-input-finishAt`"
                                                    name="finish_at"
                                                    prepend-inner-icon="mdi-calendar"
                                                    outlined
                                                    v-model="date.finish_date.input"
                                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 45"
                                                    :error-messages="error.finish_at"
                                                    clearable
                                                    @click:clear="date.finish_date.input = ''"
                                                    dense
                                                >
                                                    <template v-slot:label>
                                                        End Date<span class="text-red">*</span>
                                                    </template>
                                                </v-text-field>
                                            </div>
                                        </template>
                                        <v-date-picker
                                            v-model="date.finish_date.input"
                                            @input="date.finish_date.model = false"
                                            :min="date.current_date"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col>
                                    <v-menu
                                        :data-unq="`itemSection-input-endTimeModel`"
                                        ref="menuEndTime"
                                        v-model="date.finish_time.model"
                                        :close-on-content-click="false"
                                        :return-value.sync="date.finish_time.input"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                :data-unq="`itemSection-input-endTime`"
                                                name="end_time"
                                                prepend-inner-icon="mdi-clock-outline"
                                                outlined
                                                clearable
                                                maxlength="5"
                                                onkeypress="return event.charCode >= 48 && event.charCode <= 58"
                                                @click:clear="date.finish_time.input = ''"
                                                v-model="date.finish_time.input"
                                                :error-messages="error.finish_at"
                                                dense
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                <template v-slot:label>
                                                    End Time<span class="text-red">*</span>
                                                </template>
                                            </v-text-field>
                                        </template>
                                        <v-time-picker
                                            format="24hr"
                                            :min="checkTimeEnd"
                                            v-if="date.finish_time.model"
                                            v-model="date.finish_time.input"
                                            full-width
                                            @click:minute="$refs.menuEndTime.save(date.finish_time.input)"
                                        ></v-time-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div class="box-title fs16 bold">
            Item
        </div>
        <div class="box-body">
            <v-row class="pa16">
                <div class="wp48">
                    <div class="bold fs14 mb16">
                        Item List
                    </div>
                    <div class="border-list" style="padding:20px;">
                        <div class="border-list-title">
                            <v-row class="mx15 mt15">
                                <div class="wp48">
                                    <v-text-field
                                        :data-unq="`itemSection-input-searchList`"
                                        dense
                                        v-model="itemsection_createupdate.search_list"
                                        outlined
                                        filled
                                        placeholder="Search..."
                                        prepend-inner-icon="search"
                                    ></v-text-field>
                                </div>
                                <div class="wp4"/>
                                <div class="wp48">
                                    <SelectProductTag
                                        :data-unq="`itemSection-input-itemCategory`"
                                        :norequired="true"
                                        :dense="true"
                                        @selected="itemCategorySelected"
                                    ></SelectProductTag>
                                </div>
                            </v-row>
                        </div>
                        <div class="border-list-scroll">
                            <div class="no-product-list" v-if="itemsection_createupdate.isLoading">
                                <div>
                                    <v-progress-circular 
                                        indeterminate
                                    ></v-progress-circular>
                                </div>
                                <div class="mt10">
                                    Loading...
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="product_list_filter.length>0">
                                    <div v-for="(item, idx) in product_list_filter" :key="idx">
                                        <div :class="product_list_hover==idx?'border-list-item-active':'border-list-item'" @mouseover="product_list_hover=idx" @mouseleave="product_list_hover=-1" @click="selectProduct(idx)">
                                            {{item.code}} - {{item.description}}
                                        </div>
                                    </div>
                                </div>
                                <div class="no-product-list" v-else>
                                    No Item
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wp4">
                    <div class="move-list-icon">
                        <div>
                            <a :data-unq="`itemSection-link-selectAll`" @click="selectAllProduct()" v-if="product_list.length > 0">
                                <img src="../../../public/icon/angle-double-right-active.svg">
                            </a>
                            <img src="../../../public/icon/angle-double-right.svg" v-else>
                        </div>
                        <div>
                            <img src="../../../public/icon/exchange-alt.svg" class="my10">
                        </div>
                        <div>
                            <a :data-unq="`itemSection-link-unselectAll`" @click="unselectAllProduct()" v-if="product_selected.length > 0">
                                <img src="../../../public/icon/angle-double-left-active.svg">
                            </a>
                            <img src="../../../public/icon/angle-double-left.svg" v-else>
                        </div>
                    </div>
                </div>
                <div class="wp48">
                    <div class="bold fs14 mb16">
                        Item Selected<span class="text-red">*</span>
                    </div>
                    <div :class="error.items?'border-list-error':'border-list'" style="padding:20px;">
                        <div class="border-list-title">
                            <v-row class="mx15 mt15">
                                <div class="wp100">
                                    <v-text-field
                                        :data-unq="`itemSection-input-searchSelected`"
                                        dense
                                        v-model="search_selected"
                                        outlined
                                        filled
                                        placeholder="Search..."
                                        prepend-inner-icon="search"
                                    ></v-text-field>
                                </div>
                            </v-row>
                        </div>
                        <div class="border-list-scroll">
                            <div v-if="product_selected_filter_search.length>0">
                                <div v-for="(item, idx) in product_selected_filter_search" :key="idx">
                                    <div :class="product_selected_hover==idx?'border-list-item-active':'border-list-item'" @mouseover="product_selected_hover=idx" @mouseleave="product_selected_hover=-1" @click="unselectProduct(item)">
                                        {{item.code}} - {{item.description}}
                                    </div>
                                </div>
                            </div>
                            <div class="no-product-list" v-else>
                                No Item Selected
                            </div>
                        </div>
                    </div>
                    <div class="text-red fs12" v-if="error.items">{{error.items}}</div>
                </div>
            </v-row>
        </div>
        <div class="box-end">
            <v-row>
                <v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :data-unq="`itemSection-button-cancelUpdate`"
                            depressed
                            outlined
                            color="#EBEBEB" 
                            class="main-btn"
                            @click="$router.go(-1)"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            :data-unq="`itemSection-button-saveUpdate`"
                            depressed
                            color="#50ABA3"
                            class="main-btn white--text"
                            @click="confirmButton()"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <ConfirmationDialogNew :sendData="ConfirmData"/>
    </v-container>
</template>
<script>
    import { mapState, mapActions } from "vuex";
    export default {
        name: "ProductSectionUpdate",
        data() {
            return {
                ConfirmData: {},
                product_list_hover :-1,
                product_selected_hover :-1,
                product_selected :[],
                error: {},
                search_selected : '',
                overlay: true
            }
        },
        created () {
            this.fetchItemSectionUpdate({id: this.$route.params.id});
            this.getProductListItemSection()
        },
        mounted() {
            let self = this
            self.$root.$on('event_error', function (err) {
                self.error = err;
                self.imageError = err.image;
            });
            self.$root.$on('event_uploadImage', function (image) {
                self.form.background_image = image
            });
        },
        computed: {
            ...mapState({
                form: state => state.itemsection.itemsection_createupdate.form,
                sequenceNumber: state => state.itemsection.itemsection_createupdate.sequenceNumber,
                product_list: state => state.itemsection.itemsection_createupdate.product_list,
                itemsection_createupdate: state => state.itemsection.itemsection_createupdate,
                date: state => state.itemsection.itemsection_createupdate.date,
            }),
            // Check for min time
            checkTimeStart() {
                const d = new Date();
                let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
                let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                const time = h + ':' + m
                if (this.date.current_date == this.date.start_date.input) {
                    return time
                }
            },
            // Check for min time
            checkTimeEnd() {
                const d = new Date();
                let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
                let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                const time = h + ':' + m
                if (this.date.current_date == this.date.finish_date.input) {
                    return time
                }
            },
            // filter product selected
            product_selected_filter() {
                let uniqueArray = this.product_selected.filter((arr, index, self) =>
                    index === self.findIndex((t) => (t.id === arr.id && t.code === arr.code)))
                return uniqueArray
            },
            // filter & search product selected
            product_selected_filter_search() {
                let search = this.product_selected_filter.filter(post => {
                    return post.code.toLowerCase().includes(this.search_selected.toLowerCase()) || post.description.toLowerCase().includes(this.search_selected.toLowerCase())
                })
                return search
            },
            // filter product selected
            product_list_filter() {
                let uniqueArray = this.product_list.filter((arr, index, self) =>
                    index === self.findIndex((t) => (t.id === arr.id && t.code === arr.code)))
                return uniqueArray
            }
        },
        methods: {
            ...mapActions([
                "fetchItemSectionUpdate",
                "getProductListItemSection",
            ]),
            //For send data to API
            confirmButton() {
                if (this.date.start_date.input && this.date.start_time.input) {
                    let value = this.date.start_date.input + 'T' + this.date.start_time.input
                    this.form.start_at = this.$moment(value).format('YYYY-MM-DDTHH:mm:ssZ');
                } else {
                    this.form.start_at = null
                }
                if (this.date.finish_date.input && this.date.finish_time.input) {
                    let value = this.date.finish_date.input + 'T' + this.date.finish_time.input
                    this.form.finish_at = this.$moment(value).format('YYYY-MM-DDTHH:mm:ssZ');
                } else {
                    this.form.finish_at = null
                }
                this.form.items = []
                if (this.product_selected_filter) {
                    this.product_selected_filter.forEach(e => {
                        this.form.items.push(e.id)
                    });
                }
                if (this.form.type == 2) {
                    this.form.background_image = ""
                }
                this.error.background_image = ''
                this.ConfirmData = {
                    model: true,
                    title: "Update Item Section",
                    text: "Are you sure want to update this Item Section?",
                    urlApi: "/campaign/v1/item_section/"+ this.$route.params.id,
                    nextPage: "/campaign/item-section",
                    data: this.form
                }
            },
            regionSelected(d) { //For select region and set id
                this.$store.commit('setFormUpdateItemSection', {...this.form, regions: [],})
                if (d) {
                    let arr = []
                    d.forEach(e => {
                        arr.push(e.id)
                    });
                    this.$store.commit('setFormUpdateItemSection', {...this.form, regions: arr})
                }
            },
            archetypeSelected(d) { //For select archetype and set id
                this.$store.commit('setFormUpdateItemSection', {...this.form, archetypes: [],})
                if (d) {
                    let arr = []
                    d.forEach(e => {
                        arr.push(e.id)
                    });
                    this.$store.commit('setFormUpdateItemSection', {...this.form, archetypes: arr,})
                }
            },
            itemCategorySelected(d) { // For select product tag
                this.$store.commit('setItemSectionCreateCategory', "")
                if (d) {
                    this.$store.commit('setItemSectionCreateCategory', d.id)
                }
                this.getProductListItemSection()
                
            },
            selectProduct(idx) { // For select product list
                let json = this.product_list[idx]
                this.product_selected.push(this.product_list[idx])
                this.product_list.splice(idx,1)
                this.product_list.forEach((e, i) => {
                    if (json.id == e.id) {
                        this.product_list.splice(i,1)
                    }
                });
            },
            unselectProduct(item) { // For unselect product selected
                this.product_selected.forEach((e, i) => {
                    if (item.id == e.id) {
                        this.product_list.push(e)
                        this.product_selected.splice(i,1)
                    }
                });
            },
            selectAllProduct() { // For select all product list
                this.product_list.forEach((e,idx) => {
                    this.product_selected.push(e)
                    if (idx+1==this.product_list.length) {
                        this.$store.commit('setItemSectionCreateProduct', [])
                    }
                });
            },
            unselectAllProduct() { // For unselect all product selected
                this.product_selected.forEach((e,idx) => {
                    this.product_list.push(e)
                    if (idx+1==this.product_selected.length) {
                        this.product_selected = []
                    }
                });
            },
        },
        watch: {
            'itemsection_createupdate.search_list': { // to filter by search box
                handler: function () {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){ 
                        that.getProductListItemSection()
                    }, 1000);
                },
                deep: true
            },
            'form': { // set date and product selected
                handler: function (val) {
                    if(val.start_at){
                        this.date.start_date.input = this.$moment(val.start_at).format('YYYY-MM-DD')
                        this.date.start_time.input = this.$moment(val.start_at).format('HH:mm')
                        this.date.finish_date.input = this.$moment(val.finish_at).format('YYYY-MM-DD')
                        this.date.finish_time.input = this.$moment(val.finish_at).format('HH:mm')
                        if(this.overlay === true) this.product_selected = val.items
                        this.overlay = false
                    }
                },
                deep: true
            },
            'error': {
                handler: function (val) { // if any error, auto scroll to error position
                    if(val){
                        setTimeout(() => {
                            const element = document.querySelector(".v-messages__message:first-of-type");
                            if(element){
                                element.scrollIntoView({block: "center", inline: "center"});
                            }
                        }, 500);
                    }
                },
                deep: true
            },
        },
    }
</script>