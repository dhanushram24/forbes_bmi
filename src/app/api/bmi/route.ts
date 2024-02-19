export async function GET(req) { 
  const searchParams = req.nextUrl.searchParams
  const inc = searchParams.get('inc')
  const queryft = searchParams.get('ft')
  const queryhtInInc = searchParams.get('htInInc')
  const querywt = searchParams.get('wt')
  const queryhtInCm = searchParams.get('htInCm')
  let m;
  let kg;
  if (inc=="true") {
    m = (parseInt(queryft, 10) * 12 + parseInt(queryhtInInc, 10)) * 0.0254;
    kg = parseInt(querywt) * 0.45359237;
  } else {
    m = parseFloat(queryhtInCm) * 0.01;
    kg = parseInt(querywt);
  }
  
  const bmi = parseFloat(kg) / (m * m);

  return Response.json(bmi);
}