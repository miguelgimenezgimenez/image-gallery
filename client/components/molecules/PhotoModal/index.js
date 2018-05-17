import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { toggleModal } from '../../../actions/photo'

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */

class PhotoModal extends React.Component {
  handleOpen () {
    toggleModal(this.props.dispatch)
  }

  handleClose () {
    toggleModal(this.props.dispatch, false)
  }

  render () {
    const { modalOpen, current } = this.props
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={() => this.handleClose()}
      />
    ]
    const imageStyle = {
      height: 400,
      width: 700,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      backgroundImage: `url(${current.imageUrl})`
    }
    return (
      <div>
        <Dialog
          title={current.title}
          actions={actions}
          modal={false}
          open={modalOpen}
          onRequestClose={() => this.handleClose()}
          autoScrollBodyContent

        >
          <div style={imageStyle} />
          <div style={{ marginTop: 10 }}>
            {current.name}
            {current.location}
            {current.date}
          </div>
        </Dialog>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  current: state.photo.currentPhoto,
  modalOpen: state.photo.modalOpen
})

export default connect(mapStateToProps)(PhotoModal)
