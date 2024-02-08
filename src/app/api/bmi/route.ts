export async function POST(req) {
  const body = await req.json();
  console.log(body);
  const isInches=body.isInches;
  let inm;
  let inkg;
  if(isInches){
	inm=(parseInt(body.feet,10)*12+parseInt(body.heightInInches,10))*0.0254;
	inkg=parseInt(body.weight)*0.45359237;
  }
  else{
	inm=parseFloat(body.heightInCm)*0.01;
	inkg=parseInt(body.weight);
  }

  const bmi = parseFloat(inkg) / (inm * inm);
  return Response.json(bmi);
}