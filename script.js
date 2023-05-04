let targetTag;
let quartoSelecionado = null;

document.addEventListener('click', event => {
    targetTag = event.target;
    const tagValue = targetTag.innerHTML;
    const className = targetTag.getAttribute('class');
    
    if(className == "quarto") { // Seletor de Quarto;
        if(quartoSelecionado != null) quartoSelecionado.style.borderColor = 'black';
        quartoSelecionado = targetTag;
        quartoSelecionado.style.borderColor = 'blue';
    }

    if(tagValue == "Criar Quarto") {
        // Ação de adicionar um Quarto na tela;
        // criará uma um quarto;
        const nome_do_quarto = window.prompt("Digite o Nome/Numero do quarto:");
        if(nome_do_quarto != null) {
            addQuartoHTML(nome_do_quarto,"").then(() => {
                mudarCorNaCriacao((quartoSelecionado != null)).then( () => {
                    quartoSelecionado = document.querySelector(`#quarto${nome_do_quarto}`);
                    quartoSelecionado.style.borderColor = 'blue';
                }).catch( () => {
                    quartoSelecionado = document.querySelector(`#quarto${nome_do_quarto}`);
                    quartoSelecionado.style.borderColor = 'blue';
                })
            });
        }

    } 
    
    if(tagValue == "Criar Beliche") {
        if(quartoSelecionado != null) quartoSelecionado.innerHTML += '<div class="beliche"><div class="beliche-superior"></div><div class="beliche-inferior"></div></div>';
        else window.alert("Voce deve criar um quarto primeiro!!");
        // let beliches = document.querySelector(".beliche");
        // for(let beliche of beliches) {
        // beliche.addEventListener('drag', event => {
        //     console.log(event);
        // })

    } 

    if(tagValue == "Criar Treliche") {
        if(quartoSelecionado != null) quartoSelecionado.innerHTML += '<div class="treliche"><div class="treliche-superior"></div><div class="treliche-meio"></div><div class="treliche-inferior"></div></div>';
        else window.alert("Voce deve criar um quarto primeiro!!");
    }

    if(tagValue == "Criar Armario") {
        if(quartoSelecionado != null) quartoSelecionado.innerHTML += '<div class="armario"><div class="armario-cima"></div><div class="armario-baixo"></div></div>';
        else window.alert("Voce deve criar um quarto primeiro!!");
    }

    if(tagValue == "Criar Fila de Armarios") {
        const numeroDeArmarios = parseInt(window.prompt("Digite o numero de armarios:"));
        if(Number.isInteger(numeroDeArmarios) && numeroDeArmarios > 0) {
            if(quartoSelecionado != null) quartoSelecionado.innerHTML += criarFilaDeArmarios(numeroDeArmarios);
            else window.alert("Voce deve criar um quarto primeiro!!");
        } else {
            window.alert("Escreva um número válido!");
        }
    }

    if(tagValue == "Copiar Quarto") {
        if(quartoSelecionado != null) copiarQuarto();
    }

    // Clicar em div pra adicionar nome;
    if(className == 'beliche-superior' || className == 'beliche-inferior' ||
       className == 'treliche-superior'|| className == 'treliche-meio'    || 
       className == 'treliche-inferior'|| className == 'armario-baixo'    ||
       className == 'armario-cima') {
        targetTag.innerHTML = window.prompt("Nome do Militar: ");
    } 

    $(document).ready( () => {
        $(".beliche, .treliche, .armario, .fila-armario").draggable();
        $(".trash").droppable({
                drop: function(event, ui) {
                ui.draggable.remove();
            }
        });
    });

})

document.addEventListener("keydown", event => {
    
    const className = targetTag.getAttribute('class');

    const cnds = className === "beliche ui-draggable ui-draggable-handle" ||
    className === "trelice ui-draggable ui-draggable-handle" ||
    className === "armario ui-draggable ui-draggable-handle" ||
    className === "armario" ||
    className === "quarto";

    if (event.key === "Delete" && cnds) {
        if(className === "quarto") {
            //
        }
        targetTag.remove()
    }
})

const criarFilaDeArmarios = n => {
    let divver = `<div class="fila-armario" style="margin = 0px; padding 0px; width: 46px; height: ${n*40+2}px;">`;
    for(let i=0;i<n;i++) divver += '<div class="armariof"><div class="armario-cima"></div><div class="armario-baixo"></div></div>';
    divver += '</div>';
    return divver;
}

const copiarQuarto = () => {
    // const qid = quartoSelecionado.getAttribute("id");
    // console.log(qid);
    novoQuarto = quartoSelecionado.innerHTML;
    nomeNovoQuarto = prompt("Digite o nome do novo quarto:");
    if(nomeNovoQuarto != null) {
        addQuartoHTML(nomeNovoQuarto,novoQuarto).then(() => {
            mudarCorNaCriacao((quartoSelecionado != null)).then( () => {
                quartoSelecionado = document.querySelector(`#quarto${nome_do_quarto}`);
                quartoSelecionado.style.borderColor = 'blue';
            }).catch( () => {
                quartoSelecionado = document.querySelector(`#quarto${nome_do_quarto}`);
                quartoSelecionado.style.borderColor = 'blue';
            })
        });
    }
    
}

const addQuartoHTML = (nome_do_quarto,mov) => {
    return new Promise((resolve, reject) => {
        document.body.innerHTML += `<div class="quarto" id="quarto${nome_do_quarto}">${nome_do_quarto} ${mov}</div>`;
        resolve();
    })
}

const mudarCorNaCriacao = stat => {
    return new Promise((resolve, reject) => {
        if(stat) {

            const quartoVelho = quartoSelecionado;
            quartoVelho.style.borderColor = 'black'
            console.log(quartoVelho.getAttribute("id"));
            resolve();

        } else {
            reject();
        }
    });
}
