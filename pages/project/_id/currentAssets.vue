<template>
  <div>
    <div class="mb-10">
      <h4 class="headline">Current Assets</h4>
      <p class="caption">
        totals are collected from previous
        <span class="orange--text">Cost Total</span> tabs
      </p>
    </div>

    <v-row v-for="(item,index) in dataset" :key="index">
      <span class="title pl-3">{{index +1}}&nbsp;•</span>
      <v-col>
        <v-text-field disabled label="Item" :value="item.name" outlined></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Cost"
          :value="getOverallYearlyTotal(CostCategory) * ((!!Number(item.percent)?Number(item.percent):0) / 100)"
          outlined
          disabled
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="item.percent"
          suffix="%"
          label="Operation Cost"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row dense class="p-relative" v-for="(item,index) in  Data" :key="index+4" align="start">
      <span class="title pl-3">{{index +4}}&nbsp;•</span>
      <v-col>
        <v-text-field label="Item" :value="item.name" outlined></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Cost"
          :value="getOverallYearlyTotal(CostCategory) * ((!!Number(item.percent)?Number(item.percent):0) / 100)"
          outlined
          disabled
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="item.percent"
          suffix="%"
          label="Operation Cost"
          outlined
          hide-details
        ></v-text-field>
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
      <v-col cols="3" class="text-center" style="border-top: 1px solid;">
        Total
        <br />
        <span class="orange--text" v-text="getOverAllTotal()">0</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import totalCalculator from "~/mixins/totalCalculators";
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  mixins: [totalCalculator],
  data() {
    return {
      Data: [{}],
      header: [
        { text: "Cost", value: "cost", sortable: false },
        { text: "Monthly Cost", value: "monthly", sortable: false },
        { text: "Yearly Cost", value: "yearly", sortable: false }
      ],
      CostCategory: [
        {
          text: "Direct Income Costs",
          value: "directIncomeCosts"
        },
        {
          text: "Staff Costs",
          value: "staffCosts"
        },
        {
          text: "Rentals",
          value: "rentals"
        },
        {
          text: "Administrative Costs",
          value: "administrativeCosts"
        },
        {
          text: "Facilities & Power",
          value: "facilitiesPower"
        },
        {
          text: "Hardware & Maintenance",
          value: "hardwareMaintenance"
        }
      ],
      dataset: [
        {
          name: "Cash in hand",
          description: " Of annual operating costs",
          percent: 5
        },
        {
          name: "receivables",
          description: "Of annual operating costs",
          percent: 5
        },
        {
          name: "Stored Assets",
          description: "Of annual operating costs",
          percent: 10
        }
      ]
    };
  },
  computed: {},
  methods: {
    GetItemsFromLocalStorage(key) {
      const data = localStorage.getItem(`${this.$route.params.id}/${key}`);
      try {
        return JSON.parse(data);
      } catch {
        return [];
      }
    },
    getOverallYearlyTotal(items) {
      const data = items
        .map(item => {
          return this.GetItemsFromLocalStorage(item.value);
        })
        .filter(item => !!item);
      let yearlyTotal = 0;
      data.forEach(item => {
        yearlyTotal += this.getYearlyTotal(item);
      });
      return yearlyTotal + yearlyTotal * 0.05;
    },
    getOverAllTotal() {
      const CostTotal = this.getOverallYearlyTotal(this.CostCategory);
      const datasetMapped = this.dataset.map(item =>
        !!Number(item.percent) ? CostTotal * (Number(item.percent) / 100) : 0
      );
      const dataMapped = this.Data.map(item =>
        !!Number(item.percent) ? CostTotal * (Number(item.percent) / 100) : 0
      );

      const datasetTotal = datasetMapped.reduce((acc, cur) => acc + cur);
      const dataTotal =
        dataMapped.length > 0 ? dataMapped.reduce((acc, cur) => acc + cur) : 0;

      return datasetTotal + dataTotal;
    }
  }
};
</script>

<style>
</style>