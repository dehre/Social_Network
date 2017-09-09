import React,{Component} from 'react'
import axios from '../axios'

export default class EditableBio extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(props){
    this.setState({
      bio: props.bio
    })
  }

  editBioIsVisible(boolean){
    this.setState({
      editBioIsVisible: boolean
    })
  }

  handleChangeBio(e){
    this.setState({
      editBioText: e.target.value
    })
  }

  handleSaveBio(){
    this.editBioIsVisible(false)
    axios.put('/api/update_bio',{bio:this.state.editBioText})
    .then((serverResponse)=>{
      this.setState(serverResponse.data)
    })
    .catch((err)=>{
      this.setState({
        error: 'Something went wrong. Please try again!'
      })
    })
  }

  render(){
    const {error,bio,editBioIsVisible} = this.state

    const noBioText = <p onClick={e=>this.editBioIsVisible(true)} className="text-link">Add your bio now</p>
    const bioText = (
      <div>
        <h4 className="text-error">{error}</h4>
        <p>{bio} || <span onClick={e=>this.editBioIsVisible(true)} className="text-link">Edit</span></p>
      </div>
    )
    const bioInput = (
      <div>
        <textarea onChange={e=>this.handleChangeBio(e)} rows="4" cols="50">{bio}</textarea>
        <button onClick={e=>this.handleSaveBio(e)}>Save</button>
        <button onClick={e=>this.editBioIsVisible(false)}>Return</button>
      </div>
    )
    const bioRender =()=>{
      if(editBioIsVisible){
        return bioInput
      }
      return (bio ? bioText : noBioText)
    }

    return (
      <div>
        {bioRender()}
      </div>
    )
  }

}