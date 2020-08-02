function meanRatings(ratings){
	sumRatings = ratings.reduce((s,i) => s+i ,0)
	return sumRatings/ratings.length
}
function standardDeviation(ratings){
	entries = ratings.length
	meanRatings = meanRatings(ratings)
	ratingDeviation = Math.sqrt(ratings.map(x => Math.pow((x - meanRatings),2)).reduce((a,b)=> a+b,0)/entries)
	return ratingDeviation
}

function normalizeRatings(ratings,newRating){
	mRating = meanRatings(ratings)
	ratingDeviation = standardDeviation(ratings)
	return (newRating-mRating)/ratingDeviation
}

function updateRating(oldValue,newInputValue,upperLimit=10){
	updatedRating = oldValue + newInputValue
	if (updatedRating <0 ) {
		updatedRating = 0 
	}
	if (updatedRating >10 ){
		updatedRating = 10
	}
	return updatedRating
}
