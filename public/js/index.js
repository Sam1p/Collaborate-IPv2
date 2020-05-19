Vue.component('rating', {
    template: '#rating-template',
    props : ['rating']
});
Vue.component('news', {
    template: '#news-template',
    props : ['heading', 'list']
});
Vue.component('suggestions', {
    template: '#suggestions-template',
    props : ['data']
});
Vue.component('covid', {
    template: '#covid-template',
    props : ['data'],
    methods : {
        severityToRating : function(severity) {
            if (severity === "LOW") return 0.9;
            if (severity === "MODERATE") return 0.4;
            return 0.2;
        }
    }
});
Vue.component('product', {
    template: '#product-template',
    props : ['data'],
    methods : {
        stockToRating : function(stock) {
            if (stock === "In Stock.") return 1;
            return 0;
        }
    }
});
Vue.component('covidnews', {
    template: '#covidnews-template',
    props : ['data']
});
Vue.component('airlinenews', {
    template: '#airlinenews-template',
    props : ['data']
});
Vue.component('whonews', {
    template: '#whonews-template',
    props : ['data']
});
Vue.component('res-table', {
    template: '#res-table-template',
    props : ['list'],
    data : function() {
        return {
            columns : []
        };
    },
    mounted : function() {
        this.updateColumns();
        window.onresize = () => {
            this.updateColumns();
        };
    },
    watch : {
        list : function(new_v, old_v) {
            this.updateColumns();
        }
    },
    methods : {
        updateColumns : function() {
            if (document.body.clientWidth <= 600 || this.list.length <= 1) this.columns = [[]];
            else if (document.body.clientWidth <= 1300 || this.list.length <= 2) this.columns = [[], []];
            else this.columns = [[], [], []];

            for(var i=0; i<this.list.length; i+=1) {
                var col = this.columns[i % this.columns.length];
                col.push(this.list[i]);
            }
        }
    }
});

var app = new Vue({
    el: "#app", 
    data: () => ({
        UserResponse: {
          OpenSource: true,
          BackgroundIP: true,
          GitHubUserName: "foo",
          GitHubPassword: "bar",
          GitHubFolderName: "Collaborate1234",
          GitHubConsent: false
        },
        axiosPostBody: {
          name: ""
        }
    }),
    methods : {
        
        }
    }
});