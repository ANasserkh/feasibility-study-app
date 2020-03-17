<template>
	<div>
		<div class="mb-10">
			<h4 class="headline">Fixed Assets</h4>
			<p class="caption">totals are collected from previous tabs</p>
		</div>

		<v-row v-for="(item,index) in CostCategory" :key="index">
			<span class="title px-2 pt-3 mt-1">{{index +1}}&nbsp;•</span>
			<v-col>
				<v-text-field disabled label="Item" :value="item.title" outlined></v-text-field>
			</v-col>
			<v-col>
				<v-text-field
					label="Cost"
					outlined
					disabled
					:value="getDepreciationTotal(GetItemsFromLocalStorage(item.value)) "
				></v-text-field>
			</v-col>
			<v-col>
				<v-text-field label="Annual Depreciation" outlined disabled></v-text-field>
			</v-col>
			<v-col>
				<v-text-field label="Monthly Depreciation" outlined hide-details></v-text-field>
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
					title: "Machines & Equipment",
					value: "machinesEquipment",
					fixed: true
				},
				{
					title: "Buildings",
					value: "buildings",
					fixed: true
				},
				{
					title: "Other Assets",
					value: "otherAssets",
					fixed: true
				},
				{
					title: "Expenses of Incorporation",
					value: "expensesOfIncorporation",
					fixed: true
				}
			]
		};
	},
	computed: {},
	methods: {
		GetItemsFromLocalStorage(key) {
			const data = localStorage.getItem(
				`${this.$route.params.id}/${key}`
			);
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
				!!Number(item.percent)
					? CostTotal * (Number(item.percent) / 100)
					: 0
			);
			const dataMapped = this.Data.map(item =>
				!!Number(item.percent)
					? CostTotal * (Number(item.percent) / 100)
					: 0
			);

			const datasetTotal = datasetMapped.reduce((acc, cur) => acc + cur);
			const dataTotal =
				dataMapped.length > 0
					? dataMapped.reduce((acc, cur) => acc + cur)
					: 0;

			return datasetTotal + dataTotal;
		}
	}
};
</script>

<style>
</style>