# ❌ Anti-References — "ดูเหมือนใช่ แต่ผิด"

> ⚠️ **รายการนี้สำคัญมาก** — บอก AI ว่า "อย่าทำแบบนี้" แม้จะดูเหมือน Tokyo

ใช้เมื่อ:
- AI generate asset แล้ว "ดูเหมือน" Tokyo แต่รู้สึกผิด
- ก่อน ship ทุก asset เช็คว่าไม่ติด "กับดัก" เหล่านี้

---

## ❌ 1. Cyberpunk Neon Tokyo

**สิ่งที่ผิด:** Akihabara ยามค่ำคืนที่มี neon ทุกหน้าต่าง + rain reflection

**ทำไมผิด:** เกมเราคือ Setagaya residential ไม่ใช่ Akihabara commercial
- Residential = เงียบ + ไม่มี neon
- มี neon = shopping zone เท่านั้น (zone 4) และต้อง subtle

**ทดสอบ:** ถ้า asset มีไฟ neon เด่นกว่า 3 ดวง → ผิด

---

## ❌ 2. Anime 2D Look (Cel-Shaded)

**สิ่งที่ผิด:** ใช้ reference จาก 2D anime → ผลลัพธ์เป็น cel-shaded 3D

**ทำไมผิด:** เกมเรา PBR-stylized ไม่ใช่ cel-shade
- Cel-shade = flat color + hard edge = "ดูเหมือน 2D"
- เราต้องการ "ดูเหมือน 3D แต่อบอุ่น" = PBR + soft lighting

**ทดสอบ:** ถ้า material ไม่มี specular variation → ผิด (cel-shade)

---

## ❌ 3. Tourist Spot Tokyo

**สิ่งที่ผิด:** Sensō-ji, Tsukiji, Shibuya crossing, Tokyo Tower

**ทำไมผิด:** เกมเราคือ residential neighborhood ไม่ใช่ tourist destination
- ไม่มี landmark ใหญ่
- ไม่มีป้าย "Welcome to Shibuya"
- เป็นเมืองที่คนอยู่อาศัย ไม่ใช่เมืองที่คนมาเที่ยว

**ทดสอบ:** ถ้า asset ดู "น่าถ่ายรูป" เกินไป → ผิด

---

## ❌ 4. Over-Saturated Colors

**สิ่งที่ผิด:** "ญี่ปุ่น = สีจัด" (ผิด)

**ทำไมผิด:** Tokyo residential ใช้สี muted (ค่อนข้างจืด)
- ไม่มีสีแดงสดบนกำแพง
- ไม่มีสีน้ำเงินครามบนประตู
- สีพาสเทล + ไม้ + คอนกรีต = หลัก

**ทดสอบ:** ถ้า saturation เกิน 60% → ผิด

---

## ❌ 5. Kawaii Mascot Style

**สิ่งที่ผิด:** ตัวละครน่ารักแบบ Hello Kitty / Sanrio

**ทำไมผิด:** ตัวละครเกมเราเป็น high school student จริงๆ ไม่ใช่ mascot
- สัดส่วน realistic (head : body = 1 : 7 ไม่ใช่ 1 : 3)
- ไม่มีดวงตากลมโต
- ไม่มีผมสี pastel ผิดธรรมชาติ

**ทดสอบ:** ถ้า character ดูเหมือน figurine collectible → ผิด

---

## ❌ 6. Cold / Blue Tone

**สิ่งที่ผิด:** "ญี่ปุ่น = เย็น สีฟ้า" (ผิด)

**ทำไมผิด:** เกมเรา warm dominant + cool accent
- Warm 70% (wood, sunset, indoor)
- Cool 30% (sky, shadow, water)
- ไม่มี scene ไหนเป็น blue dominant ทั้งหมด

**ทดสอบ:** ถ้า scene ดู "หนาวเย็น" → ผิด (ยกเว้น winter scene ที่ไม่มีในเกม)

---

## ❌ 7. Heavy Makeup / Cosplay

**สิ่งที่ผิด:** ชุดนักเรียนแบบ anime โชว์หน้าอก + กระโปรงสั้น + ผมสีแปลก

**ทำไมผิด:** ชุดนักเรียนในเกมเรา = real Japanese high school uniform
- กระโปรงยาวครึ่งเข่า (ไม่สั้น)
- เสื้อเชิ้ตติดกระดุมครบ (ไม่เปิด)
- ผมสีดำ/น้ำตาลเข้ม (ไม่ม่วง/ชมพู)
- ไม่มีเครื่องประดับเยอะ

**ทดสอบ:** ถ้า character ดู "พร้อมถ่ายแฟชั่น" → ผิด

---

## ❌ 8. Rain Always

**สิ่งที่ผิด:** "Tokyo = ฝนตกตลอด" (ไม่จริง)

**ทำไมผิด:** เกมเราเน้น spring clear เป็นหลัก
- Weather default = แจ่มใส เมฆบาง
- ฝนเป็น effect เสริม (มี 1-2 scene ที่ฝนตกปรอยๆ)
- ไม่มีพายุ ไม่มีฝนตกหนัก

**ทดสอบ:** ถ้าทุก scene มี rain particle → ผิด

---

## ❌ 9. Dense Crowd

**สิ่งที่ผิด:** Shibuya crossing คนเยอะ (300+ คน)

**ทำไมผิด:** เกมเรา residential คนไม่เยอะ
- โซน 1-2: 0-3 คน
- โซน 3 (station): 5-10 คน (rush hour)
- โซน 4 (shopping): 15-25 คน
- โซน 5 (shrine): 0-2 คน

**ทดสอบ:** ถ้า NPC > 30 ตัวใน frame → ผิด

---

## ❌ 10. Pet / Animal Mascot

**สิ่งที่ผิด:** เกม slice-of-life ญี่ปุ่นมักมี "สัตว์คู่ใจ" เดินตาม

**ทำไมผิด:** เกมเราไม่มี
- ไม่มีหมา แมวคู่ใจ
- ไม่มี mascot animal
- Animal ambient (แมวจร, นก, กินโคะ) ได้แต่ต้อง ambient ไม่ใช่ companion

**ทดสอบ:** ถ้ามี animal follow player → ผิด

---

## ❌ 11. Magic / Supernatural

**สิ่งที่ผิด:** มีผี มีเทพ มีคาถา

**ทำไมผิด:** เกมเรา real-world realistic
- ไม่มี yokai
- ไม่มี shrine maiden ที่มีพลัง
- ศาลเจ้าเป็นสถานที่ ไม่ใช่ portal

**ทดสอบ:** ถ้ามี particle effect ที่ "วิเศษ" → ผิด

---

## ❌ 12. Combat / Quest

**สิ่งที่ผิด:** มี mission / boss / weapon

**ทำไมผิด:** เกมเราไม่มี combat
- ไม่มี sword, gun, magic
- ไม่มี HP bar (มี stamina สำหรับวิ่ง)
- ไม่มี "you win" / "you lose"

**ทดสอบ:** ถ้ามี weapon icon ใน HUD → ผิด

---

## ❌ 13. Hyper-Active NPC

**สิ่งที่ผิด:** NPC เดินเร็ว วิ่ง กระโดด

**ทำไมผิด:** ญี่ปุ่น = polite + ไม่ hurrying
- NPC เดินช้า
- ไม่มี NPC วิ่ง
- ไม่มี NPC ตะโกน

**ทดสอบ:** ถ้า NPC animation = run → ผิด

---

## ❌ 14. Cliche Sound Effects

**สิ่งที่ผิด:** coin sound, level up sound, jump sound

**ทำไมผิด:** เกมเรา realistic
- ไม่มี sound effect เกมมิ่ง
- เสียงเป็น realistic (footstep, door, wind)
- ไม่มี sound effect ที่ "บอกผู้เล่นว่าทำถูก"

**ทดสอบ:** ถ้ามี "ding!" sound → ผิด

---

## ❌ 15. Generic UI

**สิ่งที่ผิด:** UI แบบ RPG generic — health bar หนาๆ, button แน่น

**ทดสมผิด:** UI เกมเรา minimal + soft
- ไม่มี border หนา
- สีพาสเทล ไม่ใช่สีจัด
- ฟอนต์อ่านง่าย ไม่ใช่ฟอนต์แฟนตาซี
- HUD ซ่อนได้ทั้งหมด

**ทดสอบ:** ถ้า UI ดูเหมือนเกม RPG ทั่วไป → ผิด

---

## วิธีใช้ Anti-Reference ตอน Generate

```markdown
# Prompt ตัวอย่าง

"Generate a Tokyo residential house.
✅ USE: Ghibli-pastel soft lighting, wood material, real proportion
❌ AVOID: cyberpunk neon, anime cel-shade, tourist landmark,
   over-saturated color, kawaii mascot style, cold blue tone"
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
