import React , {Component} from 'react'


class NewMap extends React.Component {
    constructor(props){
        super(props)

        this.newmap = React.createRef();
    }

    componentDidMount(){
        this.map  = new window.daum.maps.Map(this.newmap.current, {
            center: new window.daum.maps.LatLng(33.450701, 126.57066),
            level: 3});
    }

    render() {

        return (
            <div ref={this.newmap} style={{width:'100%' , height:800}}></div>
        )
    }
}

export default NewMap

