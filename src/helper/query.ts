import { Currency, Rate } from "../models"

export const getHookRates = async (search_text: string) => {
    let word_count = search_text.split(' ');
    if (word_count.length > 1) {
        const base_currency: any = await Currency.findOne({ keyword: { $regex: '.*' + word_count[0]?.toLocaleLowerCase() + '.*' } });
        const to_currency: any = await Currency.findOne({ keyword: { $regex: '.*' + word_count[2]?.toLocaleLowerCase() + '.*' } });
        let query: any = {};
        if (base_currency) {
            query["from_currency"] = base_currency._id;
        }
        if (to_currency) {
            query["to_currency"] = to_currency._id;
        }
        const rates: any = await Rate.find(query).populate('currency').populate('user');
        if (rates) {
            return rates;
        }
        else {
            return
        }
    }
    else {
        return;
    }


}