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

  moveTab=(dragIndex, hoverIndex)=>{
    this.setState((state, props) => {
      let newTabs = [...state.tabs]
      newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0]);
      console.log(newTabs)
      return { tabs: newTabs };
    });
  }

  selectTab=(selectedIndex, selectedID)=>{
    this.setState((state, props) => {
      const newTabs=state.tabs.map(item=>({
        ...item,
        active:item.id===selectedID
      }));
      return { tabs: newTabs };
    });
  }


  // Function for removing tab(by default one tab should always be there)
  closedTab=(removedIndex)=>{
    this.setState({deleteConfirmation:true,removedIndex:removedIndex})
  }

  confirmDelete=()=>{
    this.setState((state,props)=>{
      let newTabs=[...state.tabs];
      if(newTabs.length>1){
        newTabs.splice(state.removedIndex,1)
      }
      let findActive=newTabs.find(item=>{
        return item.active === true
      })
      if(findActive === undefined){
        newTabs[0].active=true
      }
      console.log(newTabs)
      return { tabs: newTabs, deleteConfirmation:false}
    })
  }

//   Funtion for adding new tab (max upto 10)
  addTab=()=>{
      this.setState((state,props)=>{
        let newTabs=[...state.tabs];
        if(newTabs.length<=9){
        newTabs.push({
          id: newTabs.length + 1,
          content: `Tab ${newTabs.length+1}`,
          active:false,
          contentText:`Content for Tab ${newTabs.length+1}`
        });
      }
        return { tabs : newTabs}
      })
  }

  scrollFn=(position)=>{
    let element=document.getElementById("tabContainer");
    if(position ==="front"){
      element.scrollLeft+=50;
    }else{
      element.scrollLeft-=50;
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

