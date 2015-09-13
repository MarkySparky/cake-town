'use strict';

var Loader = React.createClass({displayName: "Loader",
	render: function(){
		return (
			React.createElement("img", {className: "spinner", src: "spinner.gif"})
		)
	}
});

var CakeList = React.createClass({displayName: "CakeList",
	fetchCakes: function() {
		$.ajax({
			url: this.props.url,
			success: function (response) {
				if (this.isMounted()) {
					//var cakes = JSON.parse(response);
					var cakes = response;
					this.setState({ loading: false, cakes: cakes });
			}
			}.bind(this)
		});
	},

	getInitialState: function () {
		return {
			loading: true,
			cakes: []
		};
	},

	render: function () {
		if (this.state.loading) {
            return React.createElement(Loader, null);
        }
		return React.createElement("ul", {className: "cakes"}, this.state.cakes.map(function(cake)  {
			return (
				React.createElement("li", {className: "cake"}, 
					React.createElement("div", {className: "photo-container"}, 
						React.createElement("img", {className: "photo", alt: cake.title, src: cake.image})
					), 
					React.createElement("div", {className: "cake-body"}, 
						React.createElement("h3", {className: "cake-title"}, cake.title), 
						React.createElement("div", {className: "cake-desc"}, cake.desc)
					)
				));
		}));
	},

	componentDidMount: function () {
		this.fetchCakes();
	}
});

React.render(
  React.createElement(CakeList, {url: "/cake.json"}),
  document.getElementById('container')
);
