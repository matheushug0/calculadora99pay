const CdiMensal = 0.0085;

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
    if (InvestimentoInicialCount_M >= 500) {
      RendimentoCDI_M = 500 * (CdiMensal / 30) * 2.2;
      Restante_M = InvestimentoInicial - 500;
      RestanteCDI_M = Restante_M * (CdiMensal / 30) * 1.0;
      RendimentoTOTAL_M = RestanteCDI_M + RendimentoCDI_M;
      InvestimentoInicialCount_M += RendimentoTOTAL_M;
      RendimentoMENSAL += RendimentoTOTAL_M;
    } else {
      RendimentoCDI_M = InvestimentoInicialCount_M * (CdiMensal / 30) * 2.2;
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
    if (InvestimentoInicialCount_A >= 500) {
      RendimentoCDI_A = 500 * (CdiMensal / 30) * 2.2;
      Restante_A = InvestimentoInicial - 500;
      RestanteCDI_A = Restante_A * (CdiMensal / 30) * 1.0;
      RendimentoTOTAL_A = RestanteCDI_A + RendimentoCDI_A;
      InvestimentoInicialCount_A += RendimentoTOTAL_A;
      RendimentoANUAL += RendimentoTOTAL_A;
    } else {
      RendimentoCDI_A = InvestimentoInicialCount_A * (CdiMensal / 30) * 2.2;
      RendimentoTOTAL_A = RendimentoCDI_A;
      InvestimentoInicialCount_A += RendimentoTOTAL_A;
      RendimentoANUAL += RendimentoTOTAL_A;
    }
  }
}

button.addEventListener("click", () => {
  let inputConv = input.value.replace(",", ".");
  InvestimentoInicial = Number(inputConv);
  console.log(InvestimentoInicial);
  console.log(typeof InvestimentoInicial);
  if (!InvestimentoInicial) {
    alert("Valor Inválido.");
    return;
  }
  console.log(InvestimentoInicial);
  calcularRendimentoMensal();
  calcularRendimentoAnual();

  content.innerHTML = `
  <div class="container bg-light rounded p-3 mt-3">
  <div class="d-flex flex-row mb-2">
  <div class="p-2 lead"><p>Total - após um mês: </p></div>
  <div class="p-2">
  <div class="input-group mb-2">
  <span class="input-group-text">$</span>
  <input type="text" class="form-control" value="${new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(InvestimentoInicialCount_M)}" disabled>
</div>
  </div>
</div>
<div class="d-flex flex-row mb-2">
<div class="p-2 lead"><p>Total - após um ano: </p></div>
<div class="p-2">
<div class="input-group mb-2">
<span class="input-group-text">$</span>
<input type="text" class="form-control" value="${new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(InvestimentoInicialCount_A)}" disabled>
</div>
</div>
</div>

<div class="d-flex flex-row mb-2">
<div class="p-2 lead"><p>Rendimento diário: </p></div>
<div class="p-2">
<div class="input-group mb-2">
<span class="input-group-text">$</span>
<input type="text" class="form-control" value="${new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(RendimentoTOTAL_M)}" disabled>
</div>
</div>
</div>

<div class="d-flex flex-row mb-2">
<div class="p-2 lead"><p>Rendimento mensal (Acumulado): </p></div>
<div class="p-2">
<div class="input-group mb-2">
<span class="input-group-text">$</span>
<input type="text" class="form-control" value="${new Intl.NumberFormat(
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
