<template>
  <div>
    <div class="mb-10">
      <h4 class="headline">Rentals</h4>
      <p
        class="caption"
      >is an agreement where a payment is made for the ... concerns, fast depreciation of goods, and a more transient workforce</p>
    </div>
    <v-row dense class="p-relative" v-for="(item,index) in  Data" :key="index" align="start">
      <span class="title pl-3">{{index +1}}&nbsp;•</span>
      <v-col>
        <v-text-field v-model="item.name" label="Items" outlined></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="item.price" label="Monthly Cost" outlined></v-text-field>
      </v-col>
      <v-col cols="2" class="text-center caption">
        Yearly Cost
        <br />
        <span class="orange--text">{{!!((Number(item.price))* 12 )?(Number( item.price))* 12:0 }}</span>
      </v-col>
      <v-btn @click="Data.splice(index,1)" icon color="error" class="row-action">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-row>

    <v-row dense align="center">
      <span class="title pl-3"></span>
      <v-col>
        <v-btn color="orange" fab @click="Data.push({})">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col></v-col>
      <v-col></v-col>
      <v-col cols="2" class="text-center" style="border-top: 1px solid;">
        Monthly Total
        <br />
        <span class="orange--text" v-text="getCostTotal(Data)">0</span>
      </v-col>
      <v-col cols="2" class="text-center" style="border-top: 1px solid;">
        Yearly Cost
        <br />
        <span class="orange--text" v-text="getYearlyTotal(Data)">0</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import totalCalculator from "~/mixins/totalCalculators";
export default {
    validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  mixins: [totalCalculator],
  data() {
    return {
      Data: [{}]
    };
  }
};
</script>

<style>
</style>