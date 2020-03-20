<template>
  <v-container>
    <v-row class="flex-nowrap">
      <v-col>
        <v-tabs v-model="section" color="orange" dark centered>
          <v-tabs-slider></v-tabs-slider>
          <v-tab @click="GoTo(tab.route)" v-for="(tab, index) in tabs" :key="index">{{ tab.title }}</v-tab>
        </v-tabs>
        <v-card class="mt-5">
          <v-card-text>
            <transition name="fade">
              <nuxt />
            </transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      prevIcon: true,
      nextIcon: true,
      section: null,
      item: null,
      sideNav: [
        {
          text: "Income and Costs"
        },
        {
          text: "Assets and liabilities"
        }
      ],
      tabs: [
        {
          title: "Income Program",
          route: "incomeProgram"
        },
        {
          title: "Direct Income Costs	",
          route: "directIncomeCosts"
        },
        {
          title: "Staff Costs",
          route: "staffCosts"
        },
        {
          title: "Rentals	",
          route: "rentals"
        },
        {
          title: "Administrative Costs",
          route: "administrativeCosts"
        },
        {
          title: "Facilities & Power",
          route: "facilitiesPower"
        },
        {
          title: "Hardware & Maintenance",
          route: "hardwareMaintenance"
        },
        {
          title: "Costs Totals",
          route: "costsTotals"
        },

        {
          title: "Current Assets",
          route: "currentAssets"
        },

        {
          title: "Machines & Equipment",
          route: "machinesEquipment"
        },
        {
          title: "Buildings",
          route: "buildings"
        },
        {
          title: "Other Assets",
          route: "otherAssets"
        },
        {
          title: "Expenses of Incorporation",
          route: "expensesOfIncorporation"
        },
        {
          title: "Fixed Assets",
          route: "fixedAssets"
        },
        {
          title: "Capital Invested",
          route: "capitalInvested"
        }
      ]
    };
  },
  async created() {
    const pageName = this.$route.name.split("-").pop();
    this.tabs.forEach((item, index) => {
      if (pageName == item.route) {
        this.section = index;
      }
    });
  },
  methods: {
    GoTo(route) {
      this.$router.push({
        path: `/project/${this.$route.params.id}/${route}`
      });
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.p-relative {
  position: relative;
}
.row-action {
  position: absolute;
  left: 100%;
  margin-left: 15px;
}
</style>
