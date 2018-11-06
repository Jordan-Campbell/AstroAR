// Astro AR
// components/editor
// Jordan Campbell
// November 2018
// adapted from: https://github.com/securingsincity/react-ace

import React from 'react';
import AceEditor from 'react-ace';
import Button from '../../components/button';
import firebase from '../../components/firebase';

import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

const defaultValue = `// This code will add a pink cube to the scene, one metre in front of the origin.
// You can add or update this code as you wish.

// When you are done hacking, click publish and make a note of the token that will pop up.
// This token can be used to select the appropriate scene in the app.

// Note that this is a demo version, so only has very limited functionality.

// ------------------------------------------------------------

function createNode() {
  var node = Mosaico.node()

  var geometry = Mosaico.cubeGeometry(0.1, 0.1, 0.1, 0.01)
  var material = Mosaico.color( 1, 0, 1, 1.0 )

  geometry.updateMaterial( material )
  node.updateGeometry(geometry)

  var position = Mosaico.float3(0, 0, -1)
  node.updatePosition(position)
}


var node = createNode()
scene.add( node )`;

class Editor extends React.Component {

  setTheme(e) {
    this.setState({
      theme: e.target.value
    });
  }

  setMode(e) {
    this.setState({
      mode: e.target.value
    });
  }

  onChange(newValue) {
    // console.log('change', newValue);
  }

  _token() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  };

  publishCallback() {
    const text = this.refs.astroEditor.editor.getValue()

    let token = this._token()

    let data = {
      token: token,
      value: text
    }

    let key = firebase.database().ref().child('scripts').push().key;
    firebase.database().ref().child('scripts').child(key).set(data);
    firebase.database().ref().child('tokens').child(token).set(key);
  }

  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue,
      theme: 'github',
      mode: 'javascript'
    };

    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.publishCallback = this.publishCallback.bind(this);
    this._token = this._token.bind(this);
  }

  render() {
    return ( <
      div style = {
        {
          zIndex: '-1'
        }
      } >
      <
      AceEditor mode = {
        this.state.mode
      }
      theme = 'tomorrow'
      onChange = {
        this.onChange
      }
      value = {
        this.state.value
      }
      name = "astro-editor"
      width = {
        '100%'
      }
      height = {
        '100vh'
      }
      ref = "astroEditor" /
      >
      <
      Button value = 'Publish'
      publishCallback = {
        this.publishCallback
      }
      /> <
      /div>
    );
  }
}

export default Editor;