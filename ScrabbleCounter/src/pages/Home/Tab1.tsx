import React, { Component } from 'react';
import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonText, IonIcon } from '@ionic/react';
import { backspace } from 'ionicons/icons'
import './Tab1.css';
import points from '../../Points/pt-br';

class Tab1 extends Component {
  state = {
    currentPlayer: "",
    currentWord: "",
    statusGame: true,
    results: [
      { name: "Paulo", points: 0 },
      { name: 'Daniela', points: 0 }
    ]
  }

  componentDidMount(){
    this.setState({letters: points});
    console.log(points)
  }

  setPoint = (point: number, letter: string) => {
    if(this.state.currentPlayer !== '') {
      const results = this.state.results;
      const currentWord = this.state.currentWord;
      results.map(result => {
        if(result.name === this.state.currentPlayer) {
          result.points = result.points + point
        }
      })
      this.setState({ results: results, currentWord: currentWord + letter })
      console.log(this.state.results)
    }
  }

  removePoint(){
    if(this.state.currentWord !== ''){
      let word = this.state.currentWord;
      let newPoint = 0;
      let players = this.state.results;
      points.map(point => {
        if(point.name === word.substr(word.length - 1)) {
          newPoint = point.value;
        }
      })
      players.map(player => {
        if(player.name === this.state.currentPlayer){
          player.points = player.points - newPoint;
        }
      })
      this.setState({ currentWord: word.substring(0, word.length -1), results: players })
    }
    console.log(this.state.results)
  }

  showResults(choice: number) {
    let results = []
    if(choice === 0) {
      results = this.state.results
      results.sort((a, b) => {
        if (a.points > b.points) {
          return -1;
        }
        if (a.points < b.points) {
          return 1;
        }
        return 0;
      })
      this.setState({results: results, statusGame: false})
    } else {
      results = [
        { name: "Paulo", points: 0 },
        { name: 'Daniela', points: 0 }
      ]
      this.setState({results: results, statusGame: true, currentPlayer: "", currentWord: ""})
    }
  }

  setCurrentPlayer(name: string) {
    this.setState({ currentPlayer: name, currentWord: '' });
  }

  render() {
    return (
      <IonPage>
      <IonContent>
          {this.state.statusGame ? 
            <IonGrid>
              <IonRow className="ion-justify-content-center margin20">
                {this.state.results.map((result, i) => {
                  return(
                    <IonButton 
                      key={i}
                      fill="clear"
                      onClick={() => this.setCurrentPlayer(result.name)}>
                      {result.name}
                    </IonButton>
                  )
                })}
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonText color="dark">
                  <h5>
                    Jogador atual: {this.state.currentPlayer !== '' ? this.state.currentPlayer : 'Nenhum'}<br />
                  </h5>
                </IonText>
              </IonRow>
              <IonRow className="ion-justify-content-center ion-align-items-center">
                <IonText color="dark" style={{ width: '65%', height: 35, backgroundColor: '#EEEEEE'}}>
                  <h4 style={{ marginTop: 5 }}>{this.state.currentWord}</h4>
                </IonText>
                <IonButton color="danger" onClick={() => this.removePoint()}>
                  <IonIcon slot="icon-only" icon={backspace} />
                </IonButton>
              </IonRow>
              <IonRow className="ion-justify-content-center margin10">
                {points.map((letter, i) => {
                  return(
                    <IonButton 
                      onClick={() => this.setPoint(letter.value, letter.name)}
                      style={{ marginTop: 10, marginRight: 10, marginLeft: 10}}
                      color="light" 
                      key={i}>
                      { letter.name }
                    </IonButton>
                  )
                })}
              </IonRow>
              <IonRow className="ion-justify-content-center margin20">
                <IonButton 
                  onClick={() => this.showResults(0)}
                  color="success">
                  Finalizar o Jogo
                </IonButton>
              </IonRow>
            </IonGrid> :
            <IonGrid>
              <IonRow className="ion-justify-content-center margin5">
                <IonButton 
                  onClick={() => this.showResults(1)}
                  color="success">
                  Recomeçar o Jogo
                </IonButton>
              </IonRow>
              {this.state.results.map((result, i) => {
                return(
                  <IonRow key={i} className="ion-justify-content-center margin5">
                    <IonText key={i} color="dark">
                      <h4 key={i}>{result.name} com {result.points}</h4>
                    </IonText>
                  </IonRow>
                )
              })}
            </IonGrid>
          }
      </IonContent>
    </IonPage>
    )
  }
};

export default Tab1;
