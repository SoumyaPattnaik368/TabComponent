import React, { Component } from "react";
import Tabs from "react-draggable-tabs";

export default class TabComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          id: 1,
          content: "Tab 1",
          active: true,
          contentText: "Content for Tab 1"
        },
        {
          id: 2,
          content: "Tab 2",
          active: false,
          contentText: "Content for Tab 2"
        },
        {
          id: 3,
          content: "Tab 3",
          active: false,
          contentText: "Content for Tab 3"
        }
      ],
      deleteConfirmation:false
    };
  }


  componentDidMount=()=>{
    let element=document.getElementsByClassName("react-tabs-container");
    element[0].setAttribute('id',"tab_container")
  }

  componentDidUpdate=()=>{
    let ele=document.getElementById("tab_container");
    if(ele.scrollWidth>ele.offsetWidth){
      document.getElementById("back-arrow").style.display="block";
      document.getElementById("front-arrow").style.display="block"
    }else{
      document.getElementById("back-arrow").style.display="none";
      document.getElementById("front-arrow").style.display="none"
    }
  }

  moveTab=(dragIndex, hoverIndex)=>{
    this.setState((state, props) => {
      let newTabs = [...state.tabs]
      newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0]);
      console.log(newTabs)
      return { tabs: newTabs };
    });
  }

  selectTab=(selectedIndex, selectedID)=>{
    let tabData=this.state.tabs;
    tabData.forEach((item)=>{
      if(item.id===selectedID){
        if(item.active === false){
         return item.active=true
        }
      }else{
       return item.active=false
      }
    })
    this.setState({tabs:tabData})
  }


  // Function for removing tab(by default one tab should always be there)
  closedTab=(removedIndex)=>{
    const defaultTab=this.state.tabs;
    if(defaultTab.length>1){
     this.setState({deleteConfirmation:true,removedIndex:removedIndex})
    }
  }

  confirmDelete=()=>{
      let newTabs=this.state.tabs;
      // if(newTabs.length>1){
        newTabs.splice(this.state.removedIndex,1)
      // }
      let findActive=newTabs.find(item=>{
        return item.active === true
      })
      if(findActive === undefined){
        newTabs[0].active=true
      }
      this.setState({ tabs: newTabs, deleteConfirmation:false})
  }

//   Funtion for adding new tab (max upto 10)
  addTab=()=>{
      let tabData=this.state.tabs;
      console.log(tabData)
      if(tabData.length<=9){
        let obj={};
        tabData.forEach(item=>{
          obj={
            id: item.id + 1,
            content: `Tab ${item.id+1}`,
            active:false,
            contentText:`Content for Tab ${item.id+1}`
          }
        })
        tabData.push(obj)
      }
      this.setState({tabs:tabData})
  }

  scrollFn=(position)=>{
    let scrollId=document.getElementById("tab_container")
    if(position ==="front"){
      scrollId.scrollLeft+=50;
    }else{
      scrollId.scrollLeft-=50;
    }
  }
  
  render() {
    const activeTab = this.state.tabs.filter(tab => tab.active === true);
    return (
      <div>
        <div className="headerTitle">Demo tab component</div>
        <div className="tab-scroll-wrapper">
        <div style={{'display':'flex'}}>
          <div className="back-arrow" id="back-arrow" onClick={this.scrollFn.bind(this,"back")}>{"<"}</div>
          <div className="tabContainer" id="tabContainer">
          <Tabs
            moveTab={this.moveTab}
            selectTab={this.selectTab}
            closeTab={this.closedTab}
            tabs={this.state.tabs}
          >
          </Tabs>
          </div>

          <div className="front-arrow" id="front-arrow" onClick={this.scrollFn.bind(this,"front")}>{">"}</div>
          <div className="addTabs" onClick={this.addTab}>+</div>
        </div>
      {
        this.state.deleteConfirmation?
        <div className="modalPopup">
        <div className="confirmText">Are you sure you want to delete?</div>
        <div className="btnContainer">
          <button type="button" onClick={()=>{this.setState({deleteConfirmation:false})}}>Cancel</button>
          <button type="button" onClick={this.confirmDelete}>Ok</button>
        </div>
        </div>:""
      }
        <div className="contentText">{activeTab[0].contentText}</div>
        </div>
      </div>
    );
  }
}

