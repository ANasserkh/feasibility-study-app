<template>
	<div>
		<div class="mb-10 text-center">
			<h4 class="headline">Capital Invested</h4>
			<p class="caption">totals are collected from previous tabs</p>
		</div>
		<v-data-table :headers="header" :items="CostCategory" :hide-default-footer="true">
			<template v-slot:body="{items}">
				<tbody>
					<tr v-for="(item,index) in items" :key="index">
						<td>{{item.text}}</td>
						<td>{{getCostTotal(GetItemsFromLocalStorage(item.value))}}</td>
						<td>{{getYearlyTotal(GetItemsFromLocalStorage(item.value))}}</td>
					</tr>

					<tr class="grey darken-2">
						<td>Subtotal</td>
						<td class="orange--text">{{getOverallMonthlyTotal(items)}}</td>
						<td class="orange--text">{{getOverallYearlyTotal(items)}}</td>
					</tr>

					<tr class="grey darken-1">
						<td>Spare (5% of costs total)</td>
						<td class="orange--text">{{getOverallMonthlyTotal(items) * 0.05}}</td>
						<td class="orange--text">{{getOverallYearlyTotal(items) * 0.05}}</td>
					</tr>

					<tr class="orange">
						<td>Total</td>
						<td>{{getOverallMonthlyTotal(items)+ (getOverallMonthlyTotal(items) * 0.05)}}</td>
						<td>{{getOverallYearlyTotal(items) + (getOverallYearlyTotal(items) * 0.05)}}</td>
					</tr>
				</tbody>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import totalCalculator from "~/mixins/totalCalculators";
export default {
	mixins: [totalCalculator],
	data() {
		return {
			header: [
				{ text: "Cost", value: "cost", sortable: false },
				{ text: "Monthly Cost", value: "monthly", sortable: false },
				{ text: "Yearly Cost", value: "yearly", sortable: false }
			],
			CostCategory: [
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
			]
		};
	},
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
		getOverallMonthlyTotal(items) {
			const data = items
				.map(item => {
					return this.GetItemsFromLocalStorage(item.value);
				})
				.filter(item => !!item);
			let monthlyTotal = 0;
			data.forEach(item => {
				monthlyTotal += this.getCostTotal(item);
			});
			return monthlyTotal;
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
			return yearlyTotal;
		}
	}
};
</script>

<style>
</style>