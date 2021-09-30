const fs = require("fs");

const characterJson = JSON.parse(
	fs.readFileSync("../character.json", { encoding: "utf-8" })
);
const id_map = JSON.parse(
	fs.readFileSync("../map.json", { encoding: "utf-8" })
);
// 整理character.json文件，按字序号分别缓存
const paragraph =
	"永和九年岁在癸丑暮春之初会于会稽山阴之兰亭修禊事也群贤毕至少长咸集此地有崇山峻岭茂林修竹又有清流激湍映带左右引以为流觞曲水列坐其次虽无丝竹管弦之盛一觞一咏亦足以畅叙幽情";
const newJson = {};
for (let i = 0; i < 60; i++) {
	// 对于每个id
	// 我需要什么？
	// 原始图的 url id => url
	// 最佳修复 url id => url
	// 它所有的字卡 url list id => url_list
	// 它所有字卡 处理后的书法修复单字url list id => url_list
	// 每个字有48个书法修复单字
	// 我们以表格形式呈现 6*8
	// 然后 S1评估需要展示S1评估的结果 每个单字和其S1的结果应该1 - 1对应
	// 然后 S2 评估有些字需要模糊掉
	// 然后 S3 评估有些字需要模糊掉
	// 所以书法字我觉得可以搞成
	// [{ori: url, s1: {passed: ?, url: url}, s2: {passed:?}, s3: {passed:?, url: url}}]
	// s2 没有url就直接展示ori然后没passed直接blur就完了

	// 感觉要对每个procedure搞一套数据
	// 1 id => url 字卡url
	// 2 id => url_list 每个id48个书法家修复的，按照s3得分排序
	// 3 id => object_list object = {s1: {passed:?, vis: [], url}, s2: {passed: ?, vis:[]}, s3: same as s1}
	// 4 id => url_list s3:1的图片url

	// 把character.json按id分开
	const thisId = String(i + 1).padStart(3, "0");
	const realId = id_map[thisId];

	const thisText = paragraph[parseInt(realId) - 1];
	const fixed_pathes = fs.readdirSync("../preprocessing/" + realId);
	const thisData = characterJson.filter(
		(item) => item.Character_id == thisId
	);
	let all_fixed = thisData.map((item) => {
			delete item["Character_id"];
			item["url"] = `../assets/preprocessing/${realId}/${
				fixed_pathes[parseInt(item.Index) - 1]
			}`;
			return item;
		});

    // return

	newJson[realId] = {};

	newJson[realId]["text"] = thisText;
    // for left column
	newJson[realId]["ori_url"] = `../assets/origins/${realId}.png`;

    // procedure 1
	newJson[realId]["card_url"] = `../assets/cards/${realId}.png`;

    // procedure 2
	newJson[realId]["preprocessing_urls"] = thisData.map((item) => {
        // console.log(item.Index)
		return `../assets/preprocessing/${realId}/${
			fixed_pathes[parseInt(item.Index) - 1]
		}`;
	});
    // return

    // for left column
	newJson[realId]["fixed_url"] = `../assets/preprocessing/${realId}/${
		fixed_pathes[
			parseInt(
				thisData.sort((a, b) => {
					if (a.S3Score != b.S3score) return b.S3score - a.S3score;
					if (a.S2score != b.S2score) return b.S2score - a.S2score;
					if (a.S1score != b.S1score) return b.S1score - a.S1score;
				})[0].Index
			) - 1 
		]
	}`;
    // for procedure 3
	newJson[realId]["s1_url"] = `../assets/s1_ori_feature_img/${realId}.png`;
	newJson[realId]["s3_url"] = `../assets/s3_ori_feature_img/${realId}.png`;
    //procedure 3
    newJson[realId]['evaluation'] = all_fixed.map(item => {
        return {
            index: item.Index,
            url: item.url,
            s1: {
                passed: item.S1 == 1,
                feature_url: `../assets/s1_feature_img/${realId}/${
                    fixed_pathes[parseInt(item.Index) - 1]
                }`,
                score: item.S1score,
                vis: {
                    ori: item.S1ori,
                    cur: item.S1feature
                }
            },
            s2: {
                passed: item.S2 == 1,
                score: item.S2score,
                vis: {
                    ori: item.S2ori,
                    cur: item.S2feature
                }
            },
            s3: {
                passed: item.S3 == 1,
                feature_url: item.S3 == 1 ? `../assets/s3_feature_img/${realId}/${
                    fixed_pathes[parseInt(item.Index) - 1]
                }`: null,
				score: item.S3score,
                vis: {
                    ori: item.S3ori,
                    cur: item.S3feature
                }
            }
        }
    })


    // procedure 4
    newJson[realId]['best6'] = thisData.filter((v, i) => i < 6).map(i => i['url'])


	/**
	 * 层次结构
	 * newJson
	 * real id of this text
	 * "001": {
	 *   text: "",
	 *   ori_url: "...",
	 *   best_fixed_url: "...",
	 *   s1_url: "...",
	 *   s3_url: "...",
	 *   p1: [ cards_urls],
	 *   p2: [ preprocessing_urls ],
	 *   p3: [ {index, url, s1: {passed, feature_url, score, vis}, s2: {passed, score, vis}, s3: {passed, score, vis}}],
	 *   p4: [ best_6 in order]
	 * }
	 */
}

const res = JSON.stringify(newJson, null, 0);
fs.writeFileSync("./all_in_one.json", res, { encoding: "utf-8" });
