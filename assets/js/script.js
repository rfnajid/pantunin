
const input = document.getElementById('input');
const randomButton = document.getElementById('random-button');
const submitButton = document.getElementById('submit-button');
const error = document.getElementById('error');
const resultCard = document.getElementById('result-card');
const pantun = document.getElementById('pantun');
const copyButton = document.getElementById('copy-button');
const copySuccess = document.getElementById('copy-success');

const dataRandom = [
    "Siap bang jago!!!",
    "Ai Lap yu",
    "Ganteng amat mas",
    "hai cakep, kenalan dong",
    "ga nyambung bego",
    "jangan lupa sholat",
    "kamu cantik, aku ganteng",
    "senyumanmu bikin rindu",
    "udah cantik, kaya lagi",
    "jelek kali kau",
    "indonesia tanah air beta",
    "kuy mutualan",
    "terimakasih",
    "shombong amat",
    "bodo amat",
    "mohon maaf lahir batin",
    "namanya siapa",
    "jangan sok tau!!",
    "selow aja kali",
    "aku anak mama"
];

const PANTUN_ENDPOINT_URL = 'https://rima.rfnaj.id/api/v1/pantun/karmina';

const init = () => {
    submitButton.addEventListener('click', submit);
    randomButton.addEventListener('click', random);
    copyButton.addEventListener('click', copy);
    input.addEventListener('submit',submit);
}

const setError = (message) => {
    document.getElementById('error').innerHTML = message ;
}

const show = (element) => {
    element.style.display = 'block';
}

const hide = (element) => {
    element.style.display = 'none';
}

const setResult = (result) => {

   pantun.value = result.sampiran + '\n' + result.isi;

    if(result.sampiran){
        hide(error)
        show(resultCard);
    }else{
        hide(resultCard);
        show(error);
    }
}

const random = () => {
    const random = dataRandom[Math.floor(Math.random()*20)];
    console.log('random : ', random);
    input.value = random;
    submit();
}

const submit = async () => {

    if(!input.value){
        return;
    }

    const request = {
        'isi': input.value
    }

    const response = await fetch(PANTUN_ENDPOINT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, plain/text'
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(request)
    });

    response.json().then(data => {
        console.log('response : ',data);
        setResult(data);
    })

}

const copy = () =>{
    // select & copy
    pantun.select();
    pantun.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");

    // deselect & unfocus
    document.getSelection().removeAllRanges();
    pantun.blur();

    // show success message
    show(copySuccess);
    setInterval(()=>{
        hide(copySuccess);
    }, 5000);
}


init();