import React, { Component } from 'react';
import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonText, IonIcon, IonCol   } from '@ionic/react';
import { backspace, newspaper } from 'ionicons/icons'
import './Tab1.css';
import points from '../../Points/pt-br';

class Tab1 extends Component {
  state = {
    isOpen: false,
    currentPlayer: "",
    currentWord: "",
    statusGame: true,
    letterBonus: '',
    wordBonus: '',
    results: [
      { name: "Paulo", points: 0 },
      { name: 'Daniela', points: 0 }
    ]
  }

  private currentPointWord = 0

  componentDidMount(){
    this.setState({letters: points});
  }

  setPoint(point: number, letter: string){
    if(this.state.currentPlayer !== '') {
      if(this.state.letterBonus === 'double') point = point * 2;
      if(this.state.letterBonus === 'triple') point = point * 3;
      const currentWord = this.state.currentWord;
      this.currentPointWord = this.currentPointWord + point
      this.setState({
        currentWord: currentWord + letter,
        letterBonus: ''
      })
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
      if(this.state.letterBonus === 'double') newPoint = newPoint * 2;
      if(this.state.letterBonus === 'triple') newPoint = newPoint * 3;
      players.map(player => {
        if(player.name === this.state.currentPlayer){
          player.points = player.points - newPoint;
        }
      })
      this.currentPointWord = this.currentPointWord - newPoint
      this.setState({ 
        currentWord: word.substring(0, word.length -1), 
        results: players,
        letterBonus: ''
      })
    }
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
      this.currentPointWord = 0
      this.setState({results: results, statusGame: true, currentPlayer: "", currentWord: "" })
    }
    console.log(this.currentPointWord)
  }

  setCurrentPlayer(name: string) {
    let results = this.state.results;
    if(this.state.wordBonus === 'double') this.currentPointWord = this.currentPointWord * 2
    if(this.state.wordBonus === 'triple') this.currentPointWord = this.currentPointWord * 3
    results.map(result => {
      if(result.name === this.state.currentPlayer) {
        result.points = result.points + this.currentPointWord
      }
    })
    this.currentPointWord = 0
    this.setState({ currentPlayer: name, currentWord: '', results: results });
    console.log(this.state.results)
  }

  setValueWordLetter(type: string, value: string){
    if(type === 'word') {
      this.setState({ wordBonus: value })
    } else if(type === 'letter') {
      this.setState({ letterBonus: value })
    }
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
                <IonButton disabled={this.state.currentPlayer === ''} color="danger" onClick={() => this.removePoint()}>
                  <IonIcon slot="icon-only" icon={backspace} />
                </IonButton>
              </IonRow>
              <IonRow className="ion-justify-content-center margin5">
                <IonCol sizeXs="6">
                  <IonButton
                    disabled={this.state.currentPlayer === ''}
                    onClick={() => this.setValueWordLetter('word', 'double')}
                    color="warning">
                    Palavra Dupla
                  </IonButton>
                </IonCol>
                <IonCol sizeXs="6">
                  <IonButton
                    disabled={this.state.currentPlayer === ''}
                    onClick={() => this.setValueWordLetter('word', 'triple')}
                    color="danger">
                    Palavra Tripla
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center margin10">
                {points.map((letter, i) => {
                  return(
                    <IonCol key={i} className="columnLetters" sizeXs="2">
                      <IonButton
                        disabled={this.state.currentPlayer === ''}
                        onClick={() => this.setPoint(letter.value, letter.name)}
                        color="light"
                        key={i}>
                        { letter.name }
                      </IonButton>
                    </IonCol>
                  )
                })}
              </IonRow>
              <IonRow className="ion-justify-content-center margin5">
                <IonCol sizeXs="6">
                  <IonButton
                    disabled={this.state.currentPlayer === ''}
                    onClick={() => this.setValueWordLetter('letter', 'double')}
                    color="secondary">
                    Letra Dupla
                  </IonButton>
                </IonCol>
                <IonCol sizeXs="6">
                  <IonButton
                    disabled={this.state.currentPlayer === ''}
                    onClick={() => this.setValueWordLetter('letter', 'triple')}>
                    Letra Tripla
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center margin20">
                <IonButton
                  disabled={this.state.currentPlayer === ''}
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
