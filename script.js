const CdiMensal = 0.008875;

let button = document.getElementById("Calcular");
let input = document.getElementById("initialInvestiment");
let content = document.getElementById("Content");

let RendimentoCDI_M,
  Restante_M,
  RestanteCDI_M,
  RendimentoTOTAL_M,
  RendimentoMENSAL = 0,
  RendimentoANUAL = 0,
  SaldoTotal_M;

let RendimentoCDI_A, Restante_A, RestanteCDI_A, RendimentoTOTAL_A, SaldoTotal_A;

let InvestimentoInicial = 0;
let InvestimentoInicialCount_M;
let InvestimentoInicialCount_A;

function calcularRendimentoMensal() {
  InvestimentoInicialCount_M = InvestimentoInicial;
  RendimentoMENSAL = 0;
  for (let i = 0; i <= 30; i++) {
    if (InvestimentoInicialCount_M >= 5000) {
      RendimentoCDI_M = 5000 * (CdiMensal / 30) * 1.1;
      Restante_M = InvestimentoInicial - 5000;
      RestanteCDI_M = Restante_M * (CdiMensal / 30) * (CdiMensal * 0.8);
      RendimentoTOTAL_M = RestanteCDI_M + RendimentoCDI_M;
      InvestimentoInicialCount_M += RendimentoTOTAL_M;
      RendimentoMENSAL += RendimentoTOTAL_M;
    } else {
      RendimentoCDI_M = InvestimentoInicialCount_M * (CdiMensal / 30) * 1.1;
      RendimentoTOTAL_M = RendimentoCDI_M;
      InvestimentoInicialCount_M += RendimentoTOTAL_M;
      RendimentoMENSAL += RendimentoTOTAL_M;
    }
  }
}

function calcularRendimentoAnual() {
  InvestimentoInicialCount_A = InvestimentoInicial;
  RendimentoANUAL = 0;
  for (let i = 0; i <= 365; i++) {
    if (InvestimentoInicialCount_A >= 5000) {
      RendimentoCDI_A = 5000 * (CdiMensal / 30) * 1.1;
      Restante_A = InvestimentoInicial - 5000;
      RestanteCDI_A = Restante_A * (CdiMensal / 30) * (CdiMensal * 0.8);
      RendimentoTOTAL_A = RestanteCDI_A + RendimentoCDI_A;
      InvestimentoInicialCount_A += RendimentoTOTAL_A;
      RendimentoANUAL += RendimentoTOTAL_A;
    } else {
      RendimentoCDI_A = InvestimentoInicialCount_A * (CdiMensal / 30) * 1.1;
      RendimentoTOTAL_A = RendimentoCDI_A;
      InvestimentoInicialCount_A += RendimentoTOTAL_A;
      RendimentoANUAL += RendimentoTOTAL_A;
    }
  }
}

function formatCurrency(input) {
  //Removendo caracteres não numéricos
  let value = input.value.replace(/\D/g, "");
  // Verifica se o valor é vazio
  if (value === "") {
    input.value = "";
    return;
  }
  //formatando para monetário
  value = (parseFloat(value) / 100).toFixed(2);
  //atualizando campo do input
  input.value = formatNumber(value);
}

function formatNumber(number) {
  return number.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

button.addEventListener("click", () => {
  let inputConv = parseFloat(input.value.replace(/\./g, "").replace(/,/g, "."));
  InvestimentoInicial = Number(inputConv);
  console.log(InvestimentoInicial);
  console.log(typeof InvestimentoInicial);
  if (!InvestimentoInicial) {
    const myModal = new bootstrap.Modal("#exampleModal", {
      keyboard: false,
    });
    const modalToggle = document.getElementById("exampleModal");
    myModal.show(modalToggle);
    return;
  }
  console.log(InvestimentoInicial);
  calcularRendimentoMensal();
  calcularRendimentoAnual();

  content.innerHTML = `
  <div class="container bg-light rounded p-3 mt-3">
  <div class="d-flex flex-row mb-2 align-items-center">
  <div class="p-2 lead"><p>Total - após um mês: </p></div>
  <div class="p-2">
  <div class="input-group mb-2">
  <span class="input-group-text p-3">R$</span>
  <input type="text" class="form-control p-3" value="${new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(InvestimentoInicialCount_M)}" disabled>
</div>
  </div>
</div>
<div class="d-flex flex-row mb-2 align-items-center">
<div class="p-2 lead"><p>Total - após um ano: </p></div>
<div class="p-2">
<div class="input-group mb-2">
<span class="input-group-text p-3">R$</span>
<input type="text" class="form-control p-3" value="${new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(InvestimentoInicialCount_A)}" disabled>
</div>
</div>
</div>

<div class="d-flex flex-row mb-2 align-items-center">
<div class="p-2 lead"><p>Rendimento diário: </p></div>
<div class="p-2">
<div class="input-group mb-2">
<span class="input-group-text p-3">R$</span>
<input type="text" class="form-control p-3" value="${new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(RendimentoTOTAL_M)}" disabled>
</div>
</div>
</div>

<div class="d-flex flex-row mb-2 align-items-center">
<div class="p-2 lead"><p>Rendimento mensal (Acumulado): </p></div>
<div class="p-2">
<div class="input-group mb-2">
<span class="input-group-text p-3">R$</span>
<input type="text" class="form-control p-3" value="${new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(RendimentoMENSAL)}" disabled>
</div>
</div>
</div>

</div>
  `;
});
