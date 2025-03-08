import { StateDomain } from '@/app/types'

type TxUrlDict = Record<string, {title: string, chapter: string}>

const txUrlDictionary: TxUrlDict  = {
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.1.htm": {
        "title": "1",
        "chapter": "1"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.4.htm": {
        "title": "2A",
        "chapter": "4"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.5.htm": {
        "title": "2A",
        "chapter": "5"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.7.htm": {
        "title": "2B",
        "chapter": "7"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.8.htm": {
        "title": "2B",
        "chapter": "8"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.11.htm": {
        "title": "2C",
        "chapter": "11"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.12.htm": {
        "title": "2C",
        "chapter": "12"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.12A.htm": {
        "title": "2C",
        "chapter": "12A"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.13.htm": {
        "title": "2C",
        "chapter": "13"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.18.htm": {
        "title": "2C",
        "chapter": "18"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.19.htm": {
        "title": "2C",
        "chapter": "19"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.21.htm": {
        "title": "2D",
        "chapter": "21"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.22.htm": {
        "title": "2D",
        "chapter": "22"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.23.htm": {
        "title": "2D",
        "chapter": "23"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.25.htm": {
        "title": "2E",
        "chapter": "25"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.26.htm": {
        "title": "2E",
        "chapter": "26"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.27.htm": {
        "title": "2E",
        "chapter": "27"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.28.htm": {
        "title": "2F",
        "chapter": "28"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.29.htm": {
        "title": "2F",
        "chapter": "29"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.30.htm": {
        "title": "2F",
        "chapter": "30"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.30A.htm": {
        "title": "2F",
        "chapter": "30A"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.31.htm": {
        "title": "2F",
        "chapter": "31"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.32.htm": {
        "title": "2F",
        "chapter": "32"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.33.htm": {
        "title": "2F",
        "chapter": "33"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.34.htm": {
        "title": "2F",
        "chapter": "34"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.35.htm": {
        "title": "2F",
        "chapter": "35"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.37.htm": {
        "title": "2G",
        "chapter": "37"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.38.htm": {
        "title": "2G",
        "chapter": "38"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.39.htm": {
        "title": "2H",
        "chapter": "39"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.39A.htm": {
        "title": "2H",
        "chapter": "39A"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.43.htm": {
        "title": "2I",
        "chapter": "43"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.44.htm": {
        "title": "2I",
        "chapter": "44"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.45.htm": {
        "title": "2I",
        "chapter": "45"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.46.htm": {
        "title": "2I",
        "chapter": "46"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.47.htm": {
        "title": "2I",
        "chapter": "47"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.48.htm": {
        "title": "2I",
        "chapter": "48"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.49.htm": {
        "title": "2I",
        "chapter": "49"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.51.htm": {
        "title": "3A",
        "chapter": "51"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.51A.htm": {
        "title": "3A",
        "chapter": "51A"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.52.htm": {
        "title": "3A",
        "chapter": "52"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.53.htm": {
        "title": "3A",
        "chapter": "53"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.53A.htm": {
        "title": "3A",
        "chapter": "53A"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.53B.htm": {
        "title": "3A",
        "chapter": "53B"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.54.htm": {
        "title": "3A",
        "chapter": "54"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.55.htm": {
        "title": "3A",
        "chapter": "55"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.56.htm": {
        "title": "3A",
        "chapter": "56"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.57.htm": {
        "title": "3A",
        "chapter": "57"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.58.htm": {
        "title": "3A",
        "chapter": "58"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.58A.htm": {
        "title": "3A",
        "chapter": "58A"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.59.htm": {
        "title": "3A",
        "chapter": "59"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.61.htm": {
        "title": "3B",
        "chapter": "61"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.62.htm": {
        "title": "3B",
        "chapter": "62"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.63.htm": {
        "title": "3B",
        "chapter": "63"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.65.htm": {
        "title": "3C",
        "chapter": "65"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.66.htm": {
        "title": "3C",
        "chapter": "66"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.67.htm": {
        "title": "3C",
        "chapter": "67"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.68.htm": {
        "title": "3C",
        "chapter": "68"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.69.htm": {
        "title": "3C",
        "chapter": "69"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.70.htm": {
        "title": "3C",
        "chapter": "70"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.71.htm": {
        "title": "3C",
        "chapter": "71"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.72.htm": {
        "title": "3C",
        "chapter": "72"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.73.htm": {
        "title": "3C",
        "chapter": "73"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.74.htm": {
        "title": "3C",
        "chapter": "74"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.75.htm": {
        "title": "3C",
        "chapter": "75"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.76.htm": {
        "title": "3C",
        "chapter": "76"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.79.htm": {
        "title": "3C",
        "chapter": "79"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.80.htm": {
        "title": "3C",
        "chapter": "80"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.85.htm": {
        "title": "3D",
        "chapter": "85"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.86.htm": {
        "title": "3D",
        "chapter": "86"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.87.htm": {
        "title": "3D",
        "chapter": "87"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.88.htm": {
        "title": "3D",
        "chapter": "88"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.89.htm": {
        "title": "3D",
        "chapter": "89"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.95.htm": {
        "title": "3E",
        "chapter": "95"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.96.htm": {
        "title": "3E",
        "chapter": "96"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.101.htm": {
        "title": "3F",
        "chapter": "101"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.102.htm": {
        "title": "3F",
        "chapter": "102"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.105.htm": {
        "title": "3F",
        "chapter": "105"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.106.htm": {
        "title": "3F",
        "chapter": "106"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.107.htm": {
        "title": "3F",
        "chapter": "107"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.109.htm": {
        "title": "3F",
        "chapter": "109"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.109A.htm": {
        "title": "3F",
        "chapter": "109A"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.110.htm": {
        "title": "3F",
        "chapter": "110"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.111.htm": {
        "title": "3F",
        "chapter": "111"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.114.htm": {
        "title": "3F",
        "chapter": "114"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.115.htm": {
        "title": "3F",
        "chapter": "115"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.130.htm": {
        "title": "3G",
        "chapter": "130"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.130A.htm": {
        "title": "3G",
        "chapter": "130A"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.131.htm": {
        "title": "3G",
        "chapter": "131"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.132.htm": {
        "title": "3G",
        "chapter": "132"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.133.htm": {
        "title": "3G",
        "chapter": "133"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.134.htm": {
        "title": "3G",
        "chapter": "134"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.134A.htm": {
        "title": "3G",
        "chapter": "134A"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.135.htm": {
        "title": "3G",
        "chapter": "135"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.136.htm": {
        "title": "3G",
        "chapter": "136"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.141.htm": {
        "title": "3H",
        "chapter": "141"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.142.htm": {
        "title": "3H",
        "chapter": "142"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.145.htm": {
        "title": "3H",
        "chapter": "145"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.149.htm": {
        "title": "3H",
        "chapter": "149"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.150.htm": {
        "title": "3H",
        "chapter": "150"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.151.htm": {
        "title": "3H",
        "chapter": "151"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.153.htm": {
        "title": "3H",
        "chapter": "153"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.154.htm": {
        "title": "3H",
        "chapter": "154"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.155.htm": {
        "title": "3H",
        "chapter": "155"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.156.htm": {
        "title": "3H",
        "chapter": "156"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.160.htm": {
        "title": "4",
        "chapter": "160"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.161.htm": {
        "title": "4",
        "chapter": "161"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.162.htm": {
        "title": "4",
        "chapter": "162"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.1001.htm": {
        "title": "5",
        "chapter": "1001"
    },
    "https://statutes.capitol.texas.gov/Docs/ED/htm/ED.2000.htm": {
        "title": "6",
        "chapter": "2000"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.1.htm": {
        "title": "1",
        "chapter": "1"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.21.htm": {
        "title": "2A",
        "chapter": "21"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.22.htm": {
        "title": "2A",
        "chapter": "22"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.23.htm": {
        "title": "2A",
        "chapter": "23"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.51.htm": {
        "title": "2B",
        "chapter": "51"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.52.htm": {
        "title": "2B",
        "chapter": "52"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.61.htm": {
        "title": "2C",
        "chapter": "61"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.62.htm": {
        "title": "2C",
        "chapter": "62"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.63.htm": {
        "title": "2C",
        "chapter": "63"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.64.htm": {
        "title": "2C",
        "chapter": "64"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.81.htm": {
        "title": "2D",
        "chapter": "81"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.82.htm": {
        "title": "2D",
        "chapter": "82"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.91.htm": {
        "title": "2E",
        "chapter": "91"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.92.htm": {
        "title": "2E",
        "chapter": "92"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.93.htm": {
        "title": "2E",
        "chapter": "93"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.101.htm": {
        "title": "3",
        "chapter": "101"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.102.htm": {
        "title": "3",
        "chapter": "102"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.103.htm": {
        "title": "3",
        "chapter": "103"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.104.htm": {
        "title": "3",
        "chapter": "104"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.104A.htm": {
        "title": "3",
        "chapter": "104A"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.105.htm": {
        "title": "3",
        "chapter": "105"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.201.htm": {
        "title": "4A",
        "chapter": "201"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.202.htm": {
        "title": "4A",
        "chapter": "202"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.203.htm": {
        "title": "4A",
        "chapter": "203"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.204.htm": {
        "title": "4A",
        "chapter": "204"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.205.htm": {
        "title": "4A",
        "chapter": "205"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.206.htm": {
        "title": "4A",
        "chapter": "206"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.207.htm": {
        "title": "4A",
        "chapter": "207"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.208.htm": {
        "title": "4A",
        "chapter": "208"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.209.htm": {
        "title": "4A",
        "chapter": "209"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.210.htm": {
        "title": "4A",
        "chapter": "210"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.211.htm": {
        "title": "4A",
        "chapter": "211"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.212.htm": {
        "title": "4A",
        "chapter": "212"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.213.htm": {
        "title": "4A",
        "chapter": "213"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.214.htm": {
        "title": "4A",
        "chapter": "214"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.215.htm": {
        "title": "4A",
        "chapter": "215"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.301.htm": {
        "title": "4B",
        "chapter": "301"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.302.htm": {
        "title": "4B",
        "chapter": "302"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.303.htm": {
        "title": "4B",
        "chapter": "303"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.304.htm": {
        "title": "4B",
        "chapter": "304"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.305.htm": {
        "title": "4B",
        "chapter": "305"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.306.htm": {
        "title": "4B",
        "chapter": "306"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.307.htm": {
        "title": "4B",
        "chapter": "307"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.308.htm": {
        "title": "4B",
        "chapter": "308"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.309.htm": {
        "title": "4B",
        "chapter": "309"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.310.htm": {
        "title": "4B",
        "chapter": "310"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.311.htm": {
        "title": "4B",
        "chapter": "311"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.312.htm": {
        "title": "4B",
        "chapter": "312"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.313.htm": {
        "title": "4B",
        "chapter": "313"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.314.htm": {
        "title": "4B",
        "chapter": "314"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.315.htm": {
        "title": "4B",
        "chapter": "315"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.316.htm": {
        "title": "4B",
        "chapter": "316"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.317.htm": {
        "title": "4B",
        "chapter": "317"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.319.htm": {
        "title": "4B",
        "chapter": "319"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.351.htm": {
        "title": "4C",
        "chapter": "351"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.352.htm": {
        "title": "4C",
        "chapter": "352"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.355.htm": {
        "title": "4C",
        "chapter": "355"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.401.htm": {
        "title": "5A",
        "chapter": "401"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.402.htm": {
        "title": "5A",
        "chapter": "402"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.403.htm": {
        "title": "5A",
        "chapter": "403"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.404.htm": {
        "title": "5A",
        "chapter": "404"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.405.htm": {
        "title": "5A",
        "chapter": "405"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.406.htm": {
        "title": "5A",
        "chapter": "406"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.407.htm": {
        "title": "5A",
        "chapter": "407"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.407A.htm": {
        "title": "5A",
        "chapter": "407A"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.408.htm": {
        "title": "5A",
        "chapter": "408"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.409.htm": {
        "title": "5A",
        "chapter": "409"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.410.htm": {
        "title": "5A",
        "chapter": "410"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.411.htm": {
        "title": "5A",
        "chapter": "411"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.412.htm": {
        "title": "5A",
        "chapter": "412"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.413.htm": {
        "title": "5A",
        "chapter": "413"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.414.htm": {
        "title": "5A",
        "chapter": "414"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.415.htm": {
        "title": "5A",
        "chapter": "415"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.416.htm": {
        "title": "5A",
        "chapter": "416"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.417.htm": {
        "title": "5A",
        "chapter": "417"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.418.htm": {
        "title": "5A",
        "chapter": "418"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.419.htm": {
        "title": "5A",
        "chapter": "419"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.451.htm": {
        "title": "5B",
        "chapter": "451"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.501.htm": {
        "title": "5C",
        "chapter": "501"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.502.htm": {
        "title": "5C",
        "chapter": "502"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.503.htm": {
        "title": "5C",
        "chapter": "503"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.504.htm": {
        "title": "5C",
        "chapter": "504"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.505.htm": {
        "title": "5C",
        "chapter": "505"
    },
    "https://statutes.capitol.texas.gov/Docs/LA/htm/LA.506.htm": {
        "title": "5C",
        "chapter": "506"
    }
}

const parseScUrl = (url: string) => {
    const match = url.match(/t(\d+)c(\d+)\.php$/)
    if (!match) {
        return {title: '', chapter: ''}
    }

    const [, title, chapter] = match

    return {title, chapter}
}

const parseTxUrl = (url: string) => txUrlDictionary[url]

export const mapUrlToChapterAndTitle = (stateDomain: StateDomain, url: string): {title: string, chapter: string} => ({
    [StateDomain.SOUTH_CAROLINA]: parseScUrl(url),
    [StateDomain.TEXAS]: parseTxUrl(url),
})[stateDomain]
