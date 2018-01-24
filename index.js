let privateKeyPair = null

function generate() {   
    showPane('generate')

    setTimeout(() => {
        var privKey = byId('privKey').value;
        privateKeyPair = webdigiKeyPair(privKey)
        console.log(privateKeyPair);
        hide("generate-progress")
        byId("generate-pubkey").innerHTML = privateKeyPair.pubkey
        byId("generate-pubkey-error").innerHTML = privateKeyPair.pubkeyError
        byId("generate-privkey").innerHTML = privateKeyPair.privkey
        byId("generate-privkey-error").innerHTML = privateKeyPair.privkeyError
        show("generate-confirm")
        show("generate-link")
    }, 1000)
}



function webdigiKeyPair(privKeyInput) {
  var {PrivateKey, PublicKey} = eos_ecc
 
    var privkeyError = ''
     var pubkeyError = ''
     
    try{
        var abc = PrivateKey.fromWif(privKeyInput);
        var privkey = abc.toWif()
        var pubkey = abc.toPublic().toString()
    } catch(error){
        privkeyError = 'Private key in invalid, please try again.'
    }   
    
    if(privkey && pubkey){
   
        try {
          var pub2 = PrivateKey.fromWif(privkey).toPublic().toString()
          if(pubkey !== pub2) {
            throw {message: 'public key miss-match: ' + pubkey + ' !== ' + pub2}
          }
        } catch(error) {
          //console.log('privkeyError', error, privkey)
          privkeyError = error.message + ' => ' + privkey
        }


       
        try {
          PublicKey.fromStringOrThrow(pubkey)
        } catch(error) {
         // console.log('pubkeyError', error, pubkey)
          pubkeyError = error.message + ' => ' + pubkey
        }

    }
  
  
  if(privkeyError || pubkeyError) {
    privkey = 'DO NOT USE'
    pubkey = 'DO NOT USE'
  }

  return {pubkey, privkey, pubkeyError, privkeyError}
}

function showPane(name) {
    //hidePanes()
    show(`${name}-pane`)
    show(`${name}-progress`)
    hide(`${name}-confirm`)
    hide(`${name}-link`)
}

//function hidePanes() {
//    for (var x of "generate transfer buy register".split(" ")) {
//        try {
//            show(`${x}-link`)
//            hide(`${x}-pane`)
//        } catch (error) {}
//    }
//}

