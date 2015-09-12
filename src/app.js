'use strict';

var Loader = React.createClass({
	render: function(){
		return (
			<img className="spinner" src="spinner.gif" />
		)
	}
});

var CakeList = React.createClass({
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
            return <Loader />;
        }
		return <ul className="cakes">{this.state.cakes.map((cake) => {
			return (
				<li className="cake">
					<div className="photo-container">
						<img className="photo" alt={cake.title} src={cake.image} />
					</div>
					<div className="cake-body">
						<h3 className="cake-title" >{cake.title}</h3>
						<div className="cake-desc" >{cake.desc}</div>
					</div>
				</li>);
		})}</ul>;
	},

	componentDidMount: function () {
		this.fetchCakes();
	}
});

React.render(
  <CakeList url='/cake.json'/>,
  document.getElementById('container')
);
