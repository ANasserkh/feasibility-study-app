export default {
    data() {
        return {};
    },
    watch: {
        Data: {
            handler: function(val) {
                const pageName = this.$route.name.split("-").pop();
                localStorage.setItem(
                    `${this.$route.params.id}/${pageName}`,
                    JSON.stringify(val)
                );
            },
            deep: true
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        getCostTotal(rows) {
            try {
                const mapped = rows.map(item => {
                    if (item.quantity) return Number(item.quantity) * Number(item.price);
                    return Number(item.price);
                });
                const total = mapped.reduce((acc, item) => (!!item ? acc + item : acc));

                return !!total ? total : 0;
            } catch (error) {
                return 0;
            }
        },
        getYearlyTotal(rows) {
            try {
                const mapped = rows.map(item => {
                    if (item.quantity)
                        return Number(item.quantity) * Number(item.price) * 12;
                    return Number(item.price) * 12;
                });
                const total = mapped.reduce((acc, item) => (!!item ? acc + item : acc));

                return !!total ? total : 0;
            } catch (error) {
                return 0;
            }
        },
        getDepreciationTotal(rows) {
            try {
                const mapped = rows.map(item => {
                    if (item.quantity)
                        return (
                            Number(item.quantity) *
                            Number(item.price) *
                            (item.depreciation / 100)
                        );
                    return Number(item.price) * (item.depreciation / 100);
                });
                const total = mapped.reduce((acc, item) => (!!item ? acc + item : acc));
                return !!total ? total : 0;
            } catch (error) {
                return 0;
            }
        },
        fetchData() {
            const pageName = this.$route.name.split("-").pop();
            const data = localStorage.getItem(`${this.$route.params.id}/${pageName}`);
            if (data) {
                this.Data = JSON.parse(data);
                return this.Data;
            }
        }
    }
};