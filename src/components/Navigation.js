import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import firebase from './Firebase';
import { withAlert } from 'react-alert';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('hope-notes');
        this.state = {
            content: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { content } = this.state;

        // eslint-disable-next-line no-extend-native
        Array.prototype.random_alert = function () {
          return this[Math.floor((Math.random()*this.length))];
        }

        // Look for profanity
        let profanity_array = ['4r5e','5h1t','5hit','a55','anal','anus','ar5e','arrse','arse','arses','ass','ass-fucker','asses','assfucker','assfukka','asshole','assholes','asswhole','a_s_s','b!tch','b00bs','b17ch','b1tch','ballbag','balls','ballsack','bastard','beastial','beastiality','bellend','bestial','bestiality','bi+ch','biatch','bitch','bitcher','bitchers','bitches','bitchin','bitching','bloody','blow job','blowjob','blowjobs','boiolas','bollock','bollok','boner','boob','boobs','booobs','boooobs','booooobs','booooooobs','breasts','buceta','bugger','bum','butt','butts','butthole','buttmuch','buttplug','c0ck','c0cksucker','carpet muncher','cawk','chink','cipa','cl1t','clit','clitoris','clits','cnut','cock','cock-sucker','cockface','cockhead','cockmunch','cockmuncher','cocks','cocksuck','cocksucked','cocksucker','cocksucking','cocksucks','cocksuka','cocksukka','cok','cokmuncher','coksucka','coon','cox','crap','cum','cummer','cumming','cums','cumshot','cunilingus','cunillingus','cunnilingus','cunt','cuntlick','cuntlicker','cuntlicking','cunts','cyalis','cyberfuc','cyberfuck','cyberfucked','cyberfucker','cyberfuckers','cyberfucking','d1ck','damn','dick','dickhead','dildo','dildos','dink','dinks','dirsa','dlck','dog-fucker','doggin','dogging','donkeyribber','doosh','duche','dyke','ejaculate','ejaculated','ejaculates','ejaculating','ejaculatings','ejaculation','ejakulate','f u c k','f u c k e r','f4nny','fag','fagging','faggitt','faggot','faggs','fagot','fagots','fags','fanny','fannyflaps','fannyfucker','fanyy','fatass','fcuk','fcuker','fcuking','feck','fecker','felching','fellate','fellatio','fingerfuck','fingerfucked','fingerfucker','fingerfuckers','fingerfucking','fingerfucks','fistfuck','fistfucked','fistfucker','fistfuckers','fistfucking','fistfuckings','fistfucks','flange','fook','fooker','fuck','fucka','fucked','fucker','fuckers','fuckhead','fuckheads','fuckin','fucking','fuckings','fuckingshitmotherfucker','fuckme','fucks','fuckwhit','fuckwit','fudge packer','fudgepacker','fuk','fuker','fukker','fukkin','fuks','fukwhit','fukwit','fux','fux0r','f_u_c_k','gangbang','gangbanged','gangbangs','gaylord','gaysex','goatse','god-dam','god-damned','goddamn','goddamned','hardcoresex','hoar','hoare','hoer','homo','hore','horniest','horny','hotsex','jack-off','jackoff','jap','jerk-off','jism','jiz','jizm','jizz','kawk','knobead','knobed','knobend','knobhead','knobjocky','knobjokey','kock','kondum','kondums','kum','kummer','kumming','kums','kunilingus','l3i+ch','l3itch','labia','lust','lusting','m0f0','m0fo','m45terbate','ma5terb8','ma5terbate','masochist','master-bate','masterb8','masterbat*','masterbat3','masterbate','masterbation','masterbations','masturbate','mo-fo','mof0','mofo','mothafuck','mothafucka','mothafuckas','mothafuckaz','mothafucked','mothafucker','mothafuckers','mothafuckin','mothafucking','mothafuckings','mothafucks','motherfuck','motherfucked','motherfucker','motherfuckers','motherfuckin','motherfucking','motherfuckings','motherfuckka','motherfucks','muff','muthafecker','muthafuckker','mutherfucker','n1gga','n1gger','nazi','nigg3r','nigg4h','nigga','niggah','niggas','niggaz','nigger','niggers','nob','nob jokey','nobhead','nobjocky','nobjokey','numbnuts','nutsack','orgasim','orgasims','orgasm','orgasms','p0rn','pawn','pecker','penis','penisfucker','phonesex','phuck','phuk','phuked','phuking','phukked','phukking','phuks','phuq','pigfucker','pimpis','piss','pissed','pisser','pissers','pisses','pissflaps','pissin','pissing','pissoff','poop','porn','porno','pornography','pornos','prick','pricks','pron','pube','pusse','pussi','pussies','pussy','pussys','rectum','retard','rimjaw','rimming','s hit','s.o.b.','sadist','schlong','screwing','scroat','scrote','scrotum','semen','sex','sh!+','sh!t','sh1t','shag','shagger','shaggin','shagging','shemale','shi+','shit','shitdick','shite','shited','shitey','shitfuck','shitfull','shithead','shiting','shitings','shits','shitted','shitter','shitters','shitting','shittings','shitty','skank','slut','sluts','smegma','smut','snatch','son-of-a-bitch','spac','spunk','s_h_i_t','t1tt1e5','t1tties','teets','teez','testical','testicle','tit','titfuck','tits','titt','tittie5','tittiefucker','titties','tittyfuck','tittywank','titwank','tosser','turd','tw4t','twat','twathead','twatty','twunt','twunter','v14gra','v1gra','vagina','viagra','vulva','w00se','wang','wank','wanker','wanky','whoar','whore','willies','willy']
        var profanity_exists = false;

        profanity_array.forEach( (element) => {
          // Check if word exists in content
          if( content.toLowerCase().indexOf( element.toLowerCase() ) > -1 ) {
            profanity_exists = true;
          }
        })

        // Look for sentiment - nothing lower than -1, for now
        var Sentiment = require('sentiment');
        var sentiment = new Sentiment();
        var sentiment_result = sentiment.analyze(content);

        if( profanity_exists || ( sentiment_result.score < -1 ) ) {
          // Remove content
          this.setState({
            content : ''
          });

          let language_alerts = [ "Ooops. Could you mind your lingo, AMIGO",
                                  "I'm sure you can be nicer, huh ?", 
                                  "Come on...you know you wanna be kinder...",
                                  "Uuum, we don't use bad words in this town", 
                                  "You sure you wanna post that ? We detected not-so-nice words",
                                  "Talk to us nice, maybe ?"];
          // Show alert
          this.props.alert.show(language_alerts.random_alert());
        }else {
          let posted_alerts = [ "Thanks for the post !",
                                  "Poooooosted!", 
                                  "Gracias for your share",
                                  "We love your post already !", 
                                  "Wow...what a post!",
                                  "Is there more where such a lovely post came from ?"];
          // Show alert
          this.props.alert.show(posted_alerts.random_alert());

          // Load and instantiate Chance for random name
          var chance = require('chance').Chance();

          this.ref.add({
            content,
            nickname : chance.name().toLowerCase()
          }).then((docRef) => {
            this.setState({
              content : ''
            });
            this.props.history.push("/");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        }
      }

    render() {
        return(
            <Navbar sticky="top" expand="lg" style={{"padding": "20px", "background" : "#5b0e2d"}}>
                <Navbar.Brand href="/" style={{"color" : "#ffa781"}}>hopes | no matter the times</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Form onSubmit={this.onSubmit} inline>
                        <FormControl disabled="true" type="text" name="content" placeholder="Say something ( and we'll give you a cute nickname, promise )" value={this.state.content} onChange={this.onChange} className="mr-lg-2" style={{"width" : "500px"}} maxlength="300" required />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withAlert()(Navigation);