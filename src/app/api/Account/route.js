import { connect } from "@/dbconfig/dbconfig";
import Magazine from "@/Models/MagazineModel";
import Newsletter from "@/Models/NewsletterModel";
import { NextResponse } from "next/server";

export async function fetchAccountData() {
    try {
        await connect();

        // Use aggregation to get all counts in a single call
        const aggregation = await Magazine.aggregate([
            {
                $facet: {
                    totalMagazines: [{ $count: "count" }],
                    researchMagazines: [{ $match: { tags: "Research" } }, { $count: "count" }],
                    eventMagazines: [{ $match: { tags: "Events" } }, { $count: "count" }],
                    byteMagazines: [{ $match: { tags: "GDSC" } }, { $count: "count" }],
                    newsletterCounts: [
                        {
                            $lookup: {
                                from: "newsletters",
                                pipeline: [{ $count: "count" }],
                                as: "newsletterCount"
                            }
                        },
                        { $unwind: "$newsletterCount" },
                        { $project: { count: "$newsletterCount.count" } }
                    ]
                }
            }
        ]);

        const magazine = aggregation[0].totalMagazines[0]?.count || 0;
        const research = aggregation[0].researchMagazines[0]?.count || 0;
        const events = aggregation[0].eventMagazines[0]?.count || 0;
        const bytes = aggregation[0].byteMagazines[0]?.count || 0;
        const subscriber = aggregation[0].newsletterCounts[0]?.count || 0;

        return [magazine, subscriber, research, events, bytes];
    } catch (error) {
        console.error({ success: false, message: error.message });
        return NextResponse.json('Error Fetching Data', error.message);
    }
}
