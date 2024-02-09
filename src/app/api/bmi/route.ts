export async function POST(req) {
  const body = await req.json();
  const isInches=body.isInches;
  let m;
  let kg;
  if(isInches){
	m=(parseInt(body.ft,10)*12+parseInt(body.htInIn,10))*0.0254;
	kg=parseInt(body.weight)*0.45359237;
  }
  else{
	m=parseFloat(body.htInCm)*0.01;
	kg=parseInt(body.weight);
  }

  const bmi = parseFloat(kg) / (m * m);
  return Response.json(bmi);
}