/**
 * Bridge.Newtonsoft.Json Test library
 * @version 1.0.0-beta2
 * @author Object.NET, Inc.
 * @copyright Copyright 2008-2017 Object.NET, Inc.
 * @compiler Bridge.NET 16.0.0-beta2
 */
Bridge.assembly("Bridge.Newtonsoft.Json.Tests", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests", {
        statics: {
            methods: {
                ByteArrayWorks: function () {
                    var arr = System.Array.init([1, 2, 3], System.Byte);
                    Bridge.Test.NUnit.Assert.AreEqual(arr, Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(System.String.concat("\"", System.Convert.toBase64String(arr, null, null, null), "\""), System.Array.type(System.Byte)));
                },
                GuidWorks: function () {
                    var guid = System.Guid.newGuid();
                    Bridge.Test.NUnit.Assert.AreEqual(guid.toByteArray(), Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("\"" + guid + "\"", System.Guid).toByteArray());
                },
                TypeWorks: function () {
                    Bridge.Test.NUnit.Assert.AreEqual(System.Collections.Generic.List$1(System.String), Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(System.String.concat("\"", Bridge.Reflection.getTypeFullName(System.Collections.Generic.List$1(System.String)), "\""), Function));
                },
                CharWorks: function () {
                    Bridge.Test.NUnit.Assert.AreEqual(97, Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("\"a\"", System.Char));
                },
                Int64Works: function () {
                    var value = System.Int64(2147483647);
                    var intValue = 2147483647;
                    Bridge.Test.NUnit.Assert.True(value.equals(Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(intValue.toString(), System.Int64)));

                    value = System.Int64.MinValue;
                    Bridge.Test.NUnit.Assert.True(value.equals(Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(System.Int64.MinValue.toString(), System.Int64)));
                },
                UInt64Works: function () {
                    var value = System.UInt64(2147483647);
                    var intValue = 2147483647;
                    Bridge.Test.NUnit.Assert.True(value.equals(Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(intValue.toString(), System.UInt64)));

                    value = System.UInt64.MinValue;
                    Bridge.Test.NUnit.Assert.True(value.equals(Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(System.UInt64.MinValue.toString(), System.UInt64)));
                },
                DecimalWorks: function () {
                    Bridge.Test.NUnit.Assert.True(System.Decimal.MinusOne.equalsT(Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("-1", System.Decimal)));
                    Bridge.Test.NUnit.Assert.True(System.Decimal.One.equalsT(Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("1", System.Decimal)));
                    Bridge.Test.NUnit.Assert.True(System.Decimal.Zero.equalsT(Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("0", System.Decimal)));
                },
                DateTimeWorks: function () {
                    var dt = new Date(2010, 6 - 1, 10, 12, 0, 0, 0);
                    var jsonDt = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("\"2010-06-10T09:00:00.000\"", System.DateTime);
                    Bridge.Test.NUnit.Assert.AreEqual(dt.getFullYear(), jsonDt.getFullYear());
                    Bridge.Test.NUnit.Assert.AreEqual((dt.getMonth() + 1), (jsonDt.getMonth() + 1));
                    Bridge.Test.NUnit.Assert.AreEqual(dt.getDate(), jsonDt.getDate());
                },
                ArrayWorks: function () {
                    var intArr = System.Array.init([1, 2, 3], System.Int32);
                    Bridge.Test.NUnit.Assert.AreEqual(intArr, Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("[1,2,3]", System.Array.type(System.Int32)));

                    var longArr = System.Array.init([System.Int64(1), System.Int64(2), System.Int64(3)], System.Int64);
                    var jsonLongArr = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("[1,2,3]", System.Array.type(System.Int64));
                    Bridge.Test.NUnit.Assert.AreEqual(longArr.length, jsonLongArr.length);
                    Bridge.Test.NUnit.Assert.True(longArr[System.Array.index(0, longArr)].equals(jsonLongArr[System.Array.index(0, jsonLongArr)]));
                    Bridge.Test.NUnit.Assert.True(longArr[System.Array.index(1, longArr)].equals(jsonLongArr[System.Array.index(1, jsonLongArr)]));
                    Bridge.Test.NUnit.Assert.True(longArr[System.Array.index(2, longArr)].equals(jsonLongArr[System.Array.index(2, jsonLongArr)]));

                    var enumArr = System.Array.init([Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3], Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1);
                    Bridge.Test.NUnit.Assert.AreEqual(enumArr, Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("[\"Item1\",\"Item2\",\"Item3\"]", System.Array.type(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1)));
                },
                ComplexArrayWorks: function () {
                    var c1 = Bridge.Newtonsoft.Json.Tests.DeserializationTests.CreateComplex(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3, 97, 98, 99);
                    var c2 = Bridge.Newtonsoft.Json.Tests.DeserializationTests.CreateComplex(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2, 99, 97, 98);

                    var a = System.Array.init([c1, c2], Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class1);

                    var json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(a);
                    var deserialized = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, System.Array.type(Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class1));

                    Bridge.Test.NUnit.Assert.NotNull$1(deserialized, "#1");
                    Bridge.Test.NUnit.Assert.AreEqual$1("Bridge.Newtonsoft.Json.Tests.DeserializationTests+Class1[]", Bridge.Reflection.getTypeFullName(Bridge.getType(deserialized)), "#2");
                    Bridge.Test.NUnit.Assert.AreEqual$1(deserialized.length, deserialized.length, "#3");
                    Bridge.Test.NUnit.Assert.NotNull$1(deserialized[System.Array.index(0, deserialized)], "#4");
                    Bridge.Test.NUnit.Assert.NotNull$1(deserialized[System.Array.index(1, deserialized)], "#5");

                    var dc1 = deserialized[System.Array.index(0, deserialized)];
                    Bridge.Newtonsoft.Json.Tests.DeserializationTests.AssertComplex(dc1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3, 97, 98, 99);

                    var dc2 = deserialized[System.Array.index(1, deserialized)];
                    Bridge.Newtonsoft.Json.Tests.DeserializationTests.AssertComplex(dc2, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2, 99, 97, 98);
                },
                EnumWorks: function () {
                    Bridge.Test.NUnit.Assert.AreEqual(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1, Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("\"Item1\"", Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1));
                },
                IListWorks: function () {
                    var list = $asm.$.Bridge.Newtonsoft.Json.Tests.DeserializationTests.f1(new (System.Collections.Generic.List$1(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1))());
                    var jsonList = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("[\"Item1\",\"Item2\",\"Item3\"]", System.Collections.Generic.List$1(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1));
                    Bridge.Test.NUnit.Assert.AreEqual(list.Count, jsonList.Count);
                    Bridge.Test.NUnit.Assert.True(list.getItem(0) === jsonList.getItem(0));
                    Bridge.Test.NUnit.Assert.True(list.getItem(1) === jsonList.getItem(1));
                    Bridge.Test.NUnit.Assert.True(list.getItem(2) === jsonList.getItem(2));
                },
                IDictionaryWorks: function () {
                    var dict = $asm.$.Bridge.Newtonsoft.Json.Tests.DeserializationTests.f2(new (System.Collections.Generic.Dictionary$2(System.String,Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1))());

                    var jsonDict = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("{\"i1\":\"Item1\",\"i2\":\"Item2\",\"i3\":\"Item3\"}", System.Collections.Generic.Dictionary$2(System.String,Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1));

                    Bridge.Test.NUnit.Assert.AreEqual(dict.count, jsonDict.count);
                    Bridge.Test.NUnit.Assert.AreEqual(dict.get("i1"), jsonDict.get("i1"));
                    Bridge.Test.NUnit.Assert.AreEqual(dict.get("i2"), jsonDict.get("i2"));
                    Bridge.Test.NUnit.Assert.AreEqual(dict.get("i3"), jsonDict.get("i3"));
                },
                TypeWithFieldWorks: function () {
                    var c = new Bridge.Newtonsoft.Json.Tests.DeserializationTests.ClassWithFields();
                    var json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c);
                    var jsonC = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.Newtonsoft.Json.Tests.DeserializationTests.ClassWithFieldsAndNoInit);

                    Bridge.Test.NUnit.Assert.AreEqual$1(c.byteArrayField, jsonC.byteArrayField, "#1");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.guidField.toByteArray(), jsonC.guidField.toByteArray(), "#2");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.typeField, jsonC.typeField, "#3");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.charField, jsonC.charField, "#4");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.longField.toString(), jsonC.longField.toString(), "#5");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.ulongField.toString(), jsonC.ulongField.toString(), "#6");
                    Bridge.Test.NUnit.Assert.AreEqual$1(Bridge.Int.format(c.decimalField, "G"), Bridge.Int.format(jsonC.decimalField, "G"), "#7");
                    Bridge.Test.NUnit.Assert.AreEqual$1(System.DateTime.format(c.dateField), System.DateTime.format(jsonC.dateField), "#8");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.enumField, jsonC.enumField, "#9");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.arrayField, jsonC.arrayField, "#10");
                    Bridge.Test.NUnit.Assert.AreEqual$1(System.Array.getCount(c.listField, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1), System.Array.getCount(jsonC.listField, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1), "#11");
                    Bridge.Test.NUnit.Assert.AreEqual$1(System.Array.getItem(c.listField, 0, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1), System.Array.getItem(jsonC.listField, 0, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1), "#12");
                    Bridge.Test.NUnit.Assert.AreEqual$1(System.Array.getItem(c.listField, 1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1), System.Array.getItem(jsonC.listField, 1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1), "#13");
                    Bridge.Test.NUnit.Assert.AreEqual$1(System.Array.getItem(c.listField, 2, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1), System.Array.getItem(jsonC.listField, 2, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1), "#14");
                    Bridge.Test.NUnit.Assert.AreEqual$1(System.Array.getCount(c.dictField, System.Collections.Generic.KeyValuePair$2(System.String,Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1)), System.Array.getCount(jsonC.dictField, System.Collections.Generic.KeyValuePair$2(System.String,Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1)), "#15");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.dictField.System$Collections$Generic$IDictionary$2$System$String$Bridge$Newtonsoft$Json$Tests$DeserializationTests$E1$getItem("i1"), jsonC.dictField.System$Collections$Generic$IDictionary$2$System$String$Bridge$Newtonsoft$Json$Tests$DeserializationTests$E1$getItem("i1"), "#16");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.dictField.System$Collections$Generic$IDictionary$2$System$String$Bridge$Newtonsoft$Json$Tests$DeserializationTests$E1$getItem("i2"), jsonC.dictField.System$Collections$Generic$IDictionary$2$System$String$Bridge$Newtonsoft$Json$Tests$DeserializationTests$E1$getItem("i2"), "#17");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.dictField.System$Collections$Generic$IDictionary$2$System$String$Bridge$Newtonsoft$Json$Tests$DeserializationTests$E1$getItem("i3"), jsonC.dictField.System$Collections$Generic$IDictionary$2$System$String$Bridge$Newtonsoft$Json$Tests$DeserializationTests$E1$getItem("i3"), "#18");
                },
                ComplexPropertiesWorks: function () {
                    var c = Bridge.Newtonsoft.Json.Tests.DeserializationTests.CreateComplex(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3, 97, 98, 99);

                    var json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c);
                    var jsonC = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class1);

                    Bridge.Newtonsoft.Json.Tests.DeserializationTests.AssertComplex(jsonC, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2, Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3, 97, 98, 99);
                },
                CreateComplex: function (item1, item2, item3, l1, l2, l3) {
                    var $t;
                    var c = new Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class1();

                    c.Sub1 = ($t=new Bridge.Newtonsoft.Json.Tests.DeserializationTests.SubClass1(), $t.Owner = c, $t.List1 = function (_o5) {
                            _o5.add(item1);
                            _o5.add(item2);
                            _o5.add(item3);
                            return _o5;
                        }(new (System.Collections.Generic.List$1(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1))()), $t);

                    c.Sub2 = ($t=new Bridge.Newtonsoft.Json.Tests.DeserializationTests.SubClass2(), $t.Owner = c, $t.List1 = function (_o6) {
                            _o6.add(l1);
                            _o6.add(l2);
                            _o6.add(l3);
                            return _o6;
                        }(new (System.Collections.Generic.List$1(System.Char))()), $t);

                    return c;
                },
                AssertComplex: function (c, item1, item2, item3, l1, l2, l3) {
                    Bridge.Test.NUnit.Assert.NotNull$1(c, "ac #1");
                    Bridge.Test.NUnit.Assert.NotNull$1(c.Sub1, "ac #2");

                    //Cycle references are ignored during serialization therefore deserialization will not restore it
                    //Assert.NotNull(c.Sub1.Owner, "ac #3");
                    //Assert.True(c.Sub1.Owner == c, "ac #4");

                    Bridge.Test.NUnit.Assert.NotNull$1(c.Sub2, "ac #5");

                    //Cycle references are ignored during serialization therefore deserialization will not restore it
                    //Assert.NotNull(c.Sub2.Owner, "ac #6");
                    //Assert.True(c.Sub2.Owner == c, "ac #7");

                    Bridge.Test.NUnit.Assert.True$1(Bridge.is(c.Sub1, Bridge.Newtonsoft.Json.Tests.DeserializationTests.SubClass1), "ac #8");
                    Bridge.Test.NUnit.Assert.True$1(Bridge.is(c.Sub2, Bridge.Newtonsoft.Json.Tests.DeserializationTests.SubClass2), "ac #9");
                    Bridge.Test.NUnit.Assert.True$1(Bridge.is(c.Sub1.List1, System.Collections.Generic.List$1(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1)), "ac #10");
                    Bridge.Test.NUnit.Assert.True$1(Bridge.is(c.Sub2.List1, System.Collections.Generic.List$1(System.Char)), "ac #11");
                    Bridge.Test.NUnit.Assert.AreEqual$1(3, c.Sub1.List1.Count, "ac #12");
                    Bridge.Test.NUnit.Assert.AreEqual$1(3, c.Sub2.List1.Count, "ac #13");

                    Bridge.Test.NUnit.Assert.AreEqual$1(item1, c.Sub1.List1.getItem(0), "ac #14");
                    Bridge.Test.NUnit.Assert.AreEqual$1(item2, c.Sub1.List1.getItem(1), "ac #15");
                    Bridge.Test.NUnit.Assert.AreEqual$1(item3, c.Sub1.List1.getItem(2), "ac #16");

                    Bridge.Test.NUnit.Assert.AreEqual$1(l1, c.Sub2.List1.getItem(0), "ac #17");
                    Bridge.Test.NUnit.Assert.AreEqual$1(l2, c.Sub2.List1.getItem(1), "ac #18");
                    Bridge.Test.NUnit.Assert.AreEqual$1(l3, c.Sub2.List1.getItem(2), "ac #19");
                },
                CamelCaseSettingWorks: function () {
                    var $t;
                    var json = "{\"intProp\":10}";
                    var deserialized = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class2, ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.ContractResolver = new Bridge.Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver(), $t));
                    Bridge.Test.NUnit.Assert.AreEqual(10, deserialized.IntProp);

                    json = "{\"IntProp\":10}";
                    deserialized = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class2);
                    Bridge.Test.NUnit.Assert.AreEqual(10, deserialized.IntProp);
                },
                IgnoreNullValueWorks: function () {
                    var $t;
                    var json = "{}";
                    var deserialized = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class3);
                    Bridge.Test.NUnit.Assert.Null(deserialized.StringProp);

                    json = "{\"StringProp\":null}";
                    deserialized = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class3);
                    Bridge.Test.NUnit.Assert.Null(deserialized.StringProp);

                    var jsonSettings = ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.NullValueHandling = Bridge.Newtonsoft.Json.NullValueHandling.Ignore, $t);

                    json = "{}";
                    deserialized = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class3, jsonSettings);
                    Bridge.Test.NUnit.Assert.Null(deserialized.StringProp);

                    json = "{\"StringProp\":null}";
                    deserialized = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class3, jsonSettings);
                    Bridge.Test.NUnit.Assert.Null(deserialized.StringProp);
                },
                AnonymousTypesWorks: function () {
                    var v = new $asm.$AnonymousType$1(108, "Hello");
                    var json = "{\"Amount\":108,\"Message\":\"Hello\"}";

                    var item = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.getType(v));
                    Bridge.Test.NUnit.Assert.AreEqual(108, item.Amount);
                    Bridge.Test.NUnit.Assert.AreEqual("Hello", item.Message);

                    var dynItem = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, System.Object);
                    Bridge.Test.NUnit.Assert.AreEqual(108, Bridge.cast(dynItem.Amount, System.Int32));
                    Bridge.Test.NUnit.Assert.AreEqual("Hello", Bridge.cast(dynItem.Message, System.String));
                },
                TypeNameHandlingWorks: function () {
                    var $t;
                    var persons = System.Array.init([new Bridge.Newtonsoft.Json.Tests.DeserializationTests.Person(System.Guid.parse("{CEADF3CA-0EB4-43F3-A813-1266E16498AC}"), "John", "New-York", "Fifth Avenue"), new Bridge.Newtonsoft.Json.Tests.DeserializationTests.Person(System.Guid.parse("{64F09E69-39FE-4D9C-BDB3-108CA2CCFAD9}"), "Mary", "London", "St Mary Axe")], Bridge.Newtonsoft.Json.Tests.DeserializationTests.Person);

                    var serialized = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(persons, ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.TypeNameHandling = Bridge.Newtonsoft.Json.TypeNameHandling.Objects, $t));
                    var entities = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(serialized, System.Array.type(Bridge.Newtonsoft.Json.Tests.DeserializationTests.INamedEntity), ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.TypeNameHandling = Bridge.Newtonsoft.Json.TypeNameHandling.Objects, $t));

                    Bridge.Test.NUnit.Assert.AreEqual(persons.length, entities.length);

                    Bridge.Test.NUnit.Assert.True(Bridge.is(entities[System.Array.index(0, entities)], Bridge.Newtonsoft.Json.Tests.DeserializationTests.Person));
                    Bridge.Test.NUnit.Assert.True(Bridge.is(entities[System.Array.index(1, entities)], Bridge.Newtonsoft.Json.Tests.DeserializationTests.Person));

                    var entity = Bridge.cast(entities[System.Array.index(0, entities)], Bridge.Newtonsoft.Json.Tests.DeserializationTests.Person);
                    Bridge.Test.NUnit.Assert.AreEqual(persons[System.Array.index(0, persons)].Name, entities[System.Array.index(0, entities)].Bridge$Newtonsoft$Json$Tests$DeserializationTests$INamedEntity$Name);
                    Bridge.Test.NUnit.Assert.True(System.Guid.op_Equality(persons[System.Array.index(0, persons)].Id, entity.Id));
                    Bridge.Test.NUnit.Assert.NotNull(entity.Address);
                    Bridge.Test.NUnit.Assert.True(Bridge.is(entity.Address, Bridge.Newtonsoft.Json.Tests.DeserializationTests.Address));
                    Bridge.Test.NUnit.Assert.AreEqual(persons[System.Array.index(0, persons)].Address.City, entity.Address.City);
                    Bridge.Test.NUnit.Assert.AreEqual(persons[System.Array.index(0, persons)].Address.Street, entity.Address.Street);

                    entity = Bridge.cast(entities[System.Array.index(1, entities)], Bridge.Newtonsoft.Json.Tests.DeserializationTests.Person);
                    Bridge.Test.NUnit.Assert.AreEqual(persons[System.Array.index(1, persons)].Name, entities[System.Array.index(1, entities)].Bridge$Newtonsoft$Json$Tests$DeserializationTests$INamedEntity$Name);
                    Bridge.Test.NUnit.Assert.True(System.Guid.op_Equality(persons[System.Array.index(1, persons)].Id, entity.Id));
                    Bridge.Test.NUnit.Assert.NotNull(entity.Address);
                    Bridge.Test.NUnit.Assert.True(Bridge.is(entity.Address, Bridge.Newtonsoft.Json.Tests.DeserializationTests.Address));
                    Bridge.Test.NUnit.Assert.AreEqual(persons[System.Array.index(1, persons)].Address.City, entity.Address.City);
                    Bridge.Test.NUnit.Assert.AreEqual(persons[System.Array.index(1, persons)].Address.Street, entity.Address.Street);
                },
                TestN504: function () {
                    var o = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("true", System.Boolean);
                    Bridge.Test.NUnit.Assert.AreEqual$1(true, o, "Bridge544 bool");
                },
                TestN504Related: function () {
                    var i = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("25", System.Int32);
                    Bridge.Test.NUnit.Assert.AreEqual$1(25, i, "Bridge544 int");

                    var dbl = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("26.1", System.Double);
                    Bridge.Test.NUnit.Assert.AreEqual$1(26.1, dbl, "Bridge544 double");

                    var d = Bridge.Json.deserialize("27.2", System.Decimal);
                    Bridge.Newtonsoft.Json.Tests.Utilities.DecimalHelper.AssertIsDecimalAndEqualTo$1(d, 27.2, "Bridge544 decimal");

                    var s = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("\"Some string\"", System.String);
                    Bridge.Test.NUnit.Assert.AreEqual$1("Some string", s, "Bridge544 string");
                }
            }
        }
    });

    Bridge.define("$AnonymousType$1", $asm, {
        $kind: "anonymous",
        ctors: {
            ctor: function (amount, message) {
                this.Amount = amount;
                this.Message = message;
            }
        },
        methods: {
            equals: function (o) {
                if (!Bridge.is(o, $asm.$AnonymousType$1)) {
                    return false;
                }
                return Bridge.equals(this.Amount, o.Amount) && Bridge.equals(this.Message, o.Message);
            },
            getHashCode: function () {
                var h = Bridge.addHash([7550196186, this.Amount, this.Message]);
                return h;
            },
            toJSON: function () {
                return {
                    Amount : this.Amount,
                    Message : this.Message
                };
            }
        },
        statics : {
            methods: {
                $metadata : function () { return {"m":[{"a":2,"n":"Amount","t":16,"rt":System.Int32,"g":{"a":2,"n":"get_Amount","t":8,"rt":System.Int32,"fg":"Amount"},"fn":"Amount"},{"a":2,"n":"Message","t":16,"rt":System.String,"g":{"a":2,"n":"get_Message","t":8,"rt":System.String,"fg":"Message"},"fn":"Message"}]}; }
            }
        }
    });

    Bridge.ns("Bridge.Newtonsoft.Json.Tests.DeserializationTests", $asm.$);

    Bridge.apply($asm.$.Bridge.Newtonsoft.Json.Tests.DeserializationTests, {
        f1: function (_o3) {
            _o3.add(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1);
            _o3.add(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2);
            _o3.add(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3);
            return _o3;
        },
        f2: function (_o4) {
            _o4.set("i1", Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1);
            _o4.set("i2", Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2);
            _o4.set("i3", Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3);
            return _o4;
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.Address", {
        props: {
            City: null,
            Street: null
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class1", {
        props: {
            Sub1: null,
            Sub2: null
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class2", {
        props: {
            IntProp: 0
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.Class3", {
        props: {
            StringProp: null
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.ClassWithFields", {
        fields: {
            byteArrayField: null,
            guidField: null,
            typeField: null,
            charField: 0,
            longField: System.Int64(0),
            ulongField: System.UInt64(0),
            decimalField: System.Decimal(0.0),
            dateField: null,
            enumField: 0,
            arrayField: null,
            listField: null,
            dictField: null
        },
        ctors: {
            init: function () {
                this.guidField = new System.Guid();
                this.dateField = System.DateTime.getDefaultValue();
                this.byteArrayField = System.Array.init([1, 2, 3], System.Byte);
                this.guidField = System.Guid.newGuid();
                this.typeField = Bridge.Newtonsoft.Json.Tests.SerializationTests;
                this.charField = 97;
                this.dateField = new Date(2010, 6 - 1, 10, 12, 0, 0, 0);
                this.arrayField = System.Array.init([1, 2, 3], System.Int32);
                this.listField = $asm.$.Bridge.Newtonsoft.Json.Tests.DeserializationTests.ClassWithFields.f1(new (System.Collections.Generic.List$1(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1))());
                this.dictField = $asm.$.Bridge.Newtonsoft.Json.Tests.DeserializationTests.ClassWithFields.f2(new (System.Collections.Generic.Dictionary$2(System.String,Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1))());
            }
        }
    });

    Bridge.ns("Bridge.Newtonsoft.Json.Tests.DeserializationTests.ClassWithFields", $asm.$);

    Bridge.apply($asm.$.Bridge.Newtonsoft.Json.Tests.DeserializationTests.ClassWithFields, {
        f1: function (_o1) {
            _o1.add(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1);
            _o1.add(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2);
            _o1.add(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3);
            return _o1;
        },
        f2: function (_o2) {
            _o2.set("i1", Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item1);
            _o2.set("i2", Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item2);
            _o2.set("i3", Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1.Item3);
            return _o2;
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.ClassWithFieldsAndNoInit", {
        fields: {
            byteArrayField: null,
            guidField: null,
            typeField: null,
            charField: 0,
            longField: System.Int64(0),
            ulongField: System.UInt64(0),
            decimalField: System.Decimal(0.0),
            dateField: null,
            enumField: 0,
            arrayField: null,
            listField: null,
            dictField: null
        },
        ctors: {
            init: function () {
                this.guidField = new System.Guid();
                this.dateField = System.DateTime.getDefaultValue();
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1", {
        $kind: "enum",
        statics: {
            fields: {
                Item1: 0,
                Item2: 1,
                Item3: 2
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.INamedEntity", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.SubClass1", {
        props: {
            Owner: null,
            List1: null
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.SubClass2", {
        props: {
            Owner: null,
            List1: null
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge1134", {
        statics: {
            methods: {
                TestJsonArrayParse: function () {
                    var o = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject("[1]", System.Array.type(System.Int32));
                    Bridge.Test.NUnit.Assert.True(o != null);
                    Bridge.Test.NUnit.Assert.AreEqual(1, o.length);
                    Bridge.Test.NUnit.Assert.AreEqual(1, o[System.Array.index(0, o)]);
                }
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge1438", {
        statics: {
            methods: {
                TestJSONParse: function () {
                    var $t;
                    var serialized = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(($t=new Bridge.Newtonsoft.Json.Tests.Issues.Bridge1438.Foo(), $t.Value = 100, $t));

                    Bridge.Test.NUnit.Assert.NotNull$1(serialized, " serialized should not be null");

                    var result = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(serialized, Bridge.Newtonsoft.Json.Tests.Issues.Bridge1438.Foo);

                    Bridge.Test.NUnit.Assert.NotNull$1(result, " result should not be null");
                    Bridge.Test.NUnit.Assert.AreEqual$1("Bridge.Newtonsoft.Json.Tests.Issues.Bridge1438+Foo", Bridge.Reflection.getTypeFullName(Bridge.getType(result)), "Check result type name");
                    Bridge.Test.NUnit.Assert.AreEqual$1(100, result.Value, "result.Value = 100");
                },
                TestJSONParseAsArray: function () {
                    var $t;
                    var serialized = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(System.Array.init([($t=new Bridge.Newtonsoft.Json.Tests.Issues.Bridge1438.Foo(), $t.Value = 101, $t)], Bridge.Newtonsoft.Json.Tests.Issues.Bridge1438.Foo));

                    Bridge.Test.NUnit.Assert.NotNull$1(serialized, " serialized should not be null");

                    var result = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(serialized, System.Array.type(Bridge.Newtonsoft.Json.Tests.Issues.Bridge1438.Foo));

                    Bridge.Test.NUnit.Assert.NotNull$1(result, " result should not be null");
                    Bridge.Test.NUnit.Assert.AreEqual$1("Bridge.Newtonsoft.Json.Tests.Issues.Bridge1438+Foo[]", Bridge.Reflection.getTypeFullName(Bridge.getType(result)), "Check result type name");
                    Bridge.Test.NUnit.Assert.AreEqual$1(1, result.length, "Check result length");
                    Bridge.Test.NUnit.Assert.NotNull$1(result[System.Array.index(0, result)], " result[0] should not be null");
                    Bridge.Test.NUnit.Assert.AreEqual$1("Bridge.Newtonsoft.Json.Tests.Issues.Bridge1438+Foo", Bridge.Reflection.getTypeFullName(Bridge.getType(result[System.Array.index(0, result)])), "Check result[0] type name");
                    Bridge.Test.NUnit.Assert.AreEqual$1(101, result[System.Array.index(0, result)].Value, "result[0].Value = 101");
                }
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge1438.Foo", {
        props: {
            Value: 0
        },
        methods: {
            SomeMethod: function () {
                return System.String.concat("I'm ", Bridge.Reflection.getTypeFullName(Bridge.getType(this)), " and my value is ", this.Value);
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge2641", {
        statics: {
            methods: {
                TestJsonCamelCaseForFields: function () {
                    var $t;
                    var c = ($t=new Bridge.Newtonsoft.Json.Tests.Issues.Bridge2641.Class1(), $t.Field1 = 1, $t.field2 = 2, $t);
                    var json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c, ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.ContractResolver = new Bridge.Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver(), $t));
                    Bridge.Test.NUnit.Assert.AreEqual("{\"field1\":1,\"field2\":2}", json);
                    var deserialized = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.Newtonsoft.Json.Tests.Issues.Bridge2641.Class1, ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.ContractResolver = new Bridge.Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver(), $t));
                    Bridge.Test.NUnit.Assert.AreEqual(1, deserialized.Field1);
                    Bridge.Test.NUnit.Assert.AreEqual(2, deserialized.field2);

                    json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c);
                    Bridge.Test.NUnit.Assert.AreEqual("{\"Field1\":1,\"field2\":2}", json);
                    deserialized = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(json, Bridge.Newtonsoft.Json.Tests.Issues.Bridge2641.Class1);
                    Bridge.Test.NUnit.Assert.AreEqual(1, deserialized.Field1);
                    Bridge.Test.NUnit.Assert.AreEqual(2, deserialized.field2);
                }
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge2641.Class1", {
        fields: {
            Field1: 0,
            field2: 0
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge2679", {
        statics: {
            methods: {
                TestTypeNameHandling: function () {
                    var $t;
                    var obj1 = new Bridge.Newtonsoft.Json.Tests.Issues.Bridge2679.Test1(1);
                    var obj2 = new (Bridge.Newtonsoft.Json.Tests.Issues.Bridge2679.Test2$1(System.Int32))(2);

                    var json1 = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(obj1, ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.TypeNameHandling = Bridge.Newtonsoft.Json.TypeNameHandling.Objects, $t));
                    Bridge.Test.NUnit.Assert.AreEqual(System.String.concat("{\"$type\":\"", Bridge.Reflection.getTypeQName(Bridge.Newtonsoft.Json.Tests.Issues.Bridge2679.Test1), "\",\"Value\":1}"), json1);

                    var json2 = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(obj2, ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.TypeNameHandling = Bridge.Newtonsoft.Json.TypeNameHandling.Objects, $t));
                    Bridge.Test.NUnit.Assert.AreEqual(System.String.concat("{\"$type\":\"", Bridge.Reflection.getTypeQName(Bridge.Newtonsoft.Json.Tests.Issues.Bridge2679.Test2$1(System.Int32)), "\",\"Value\":2}"), json2);
                }
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge2679.Test1", {
        props: {
            Value: 0
        },
        ctors: {
            ctor: function (value) {
                this.$initialize();
                this.Value = value;
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge2679.Test2$1", function (T) { return {
        props: {
            Value: Bridge.getDefaultValue(T)
        },
        ctors: {
            ctor: function (value) {
                this.$initialize();
                this.Value = value;
            }
        }
    }; });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge501", {
        statics: {
            methods: {
                TestUseCase: function () {
                    var list = $asm.$.Bridge.Newtonsoft.Json.Tests.Issues.Bridge501.f1(new (System.Collections.Generic.List$1(System.Int32))());
                    var z = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(list); // this is ok
                    Bridge.Test.NUnit.Assert.AreEqual$1("[7]", z, "List<int>");

                    var b = $asm.$.Bridge.Newtonsoft.Json.Tests.Issues.Bridge501.f2(new Bridge.Newtonsoft.Json.Tests.Issues.Bridge501B());
                    var y = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(b); // wrong, missing items
                    Bridge.Test.NUnit.Assert.AreEqual$1("[1,2]", y, "Bridge501B");

                    var a = $asm.$.Bridge.Newtonsoft.Json.Tests.Issues.Bridge501.f3(new Bridge.Newtonsoft.Json.Tests.Issues.Bridge501A()); // sine items is defined as member, push fails
                    var x = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(a);
                    Bridge.Test.NUnit.Assert.AreEqual$1("[7]", x, "Bridge501A");

                    var c = Bridge.Newtonsoft.Json.JsonConvert.DeserializeObject(x, Bridge.Newtonsoft.Json.Tests.Issues.Bridge501A);
                    Bridge.Test.NUnit.Assert.AreEqual$1("12", c.Items, "Bridge501A Parse c.Items");
                    Bridge.Test.NUnit.Assert.AreEqual$1(7, c.getItem(0), "Bridge501A Parse c[0]");
                }
            }
        }
    });

    Bridge.ns("Bridge.Newtonsoft.Json.Tests.Issues.Bridge501", $asm.$);

    Bridge.apply($asm.$.Bridge.Newtonsoft.Json.Tests.Issues.Bridge501, {
        f1: function (_o7) {
            _o7.add(7);
            return _o7;
        },
        f2: function (_o8) {
            _o8.add(1);
            _o8.add(2);
            return _o8;
        },
        f3: function (_o9) {
            _o9.add(7);
            return _o9;
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge501A", {
        inherits: [System.Collections.Generic.List$1(System.Int32)],
        fields: {
            Items: null
        },
        ctors: {
            init: function () {
                this.Items = "12";
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Issues.Bridge501B", {
        inherits: [System.Collections.Generic.List$1(System.Int32)]
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.SerializationTests", {
        statics: {
            methods: {
                ByteArrayWorks: function () {
                    var arr = System.Array.init([1, 2, 3], System.Byte);
                    Bridge.Test.NUnit.Assert.AreEqual(System.String.concat("\"", System.Convert.toBase64String(arr, null, null, null), "\""), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(arr));
                },
                GuidWorks: function () {
                    var guid = System.Guid.newGuid();
                    Bridge.Test.NUnit.Assert.AreEqual(System.String.concat("\"", guid.toString(), "\""), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(guid));
                },
                TypeWorks: function () {
                    Bridge.Test.NUnit.Assert.AreEqual(System.String.concat("\"", Bridge.Reflection.getTypeFullName(System.Collections.Generic.List$1(System.String)), "\""), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(System.Collections.Generic.List$1(System.String)));
                },
                CharWorks: function () {
                    var c = 97;
                    Bridge.Test.NUnit.Assert.AreEqual("\"a\"", Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(Bridge.box(c, System.Char, $box_.System.Char.toString, $box_.System.Char.getHashCode)));
                },
                Int64Works: function () {
                    var value = System.Int64.MaxValue;
                    Bridge.Test.NUnit.Assert.AreEqual(System.Int64.MaxValue.toNumber(), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(value));

                    value = System.Int64.MinValue;
                    Bridge.Test.NUnit.Assert.AreEqual(System.Int64.MinValue.toNumber(), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(value));
                },
                UInt64Works: function () {
                    var value = System.UInt64.MaxValue;
                    Bridge.Test.NUnit.Assert.AreEqual(System.UInt64.MaxValue.toNumber(), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(value));

                    value = System.UInt64.MinValue;
                    Bridge.Test.NUnit.Assert.AreEqual(System.UInt64.MinValue.toNumber(), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(value));
                },
                DecimalWorks: function () {
                    var value = System.Decimal.MaxValue;
                    Bridge.Test.NUnit.Assert.AreEqual(System.Decimal.MaxValue.toFloat(), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(value));

                    value = System.Decimal.MinValue;
                    Bridge.Test.NUnit.Assert.AreEqual(System.Decimal.MinValue.toFloat(), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(value));

                    value = System.Decimal.MinusOne;
                    Bridge.Test.NUnit.Assert.AreEqual(System.Decimal.MinusOne.toFloat(), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(value));

                    value = System.Decimal.One;
                    Bridge.Test.NUnit.Assert.AreEqual(System.Decimal.One.toFloat(), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(value));

                    value = System.Decimal.Zero;
                    Bridge.Test.NUnit.Assert.AreEqual(System.Decimal.Zero.toFloat(), Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(value));
                },
                DateTimeWorks: function () {
                    var dt = new Date(2010, 6 - 1, 10, 12, 0, 0, 0);
                    var s = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(Bridge.box(dt, System.DateTime, $box_.System.DateTime.toString));
                    Bridge.Test.NUnit.Assert.AreEqual$1(JSON.stringify(dt), s, System.String.concat("Result: ", s));
                },
                ArrayWorks: function () {
                    var intArr = System.Array.init([1, 2, 3], System.Int32);
                    Bridge.Test.NUnit.Assert.AreEqual("[1,2,3]", Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(intArr));

                    var longArr = System.Array.init([System.Int64(1), System.Int64(2), System.Int64(3)], System.Int64);
                    Bridge.Test.NUnit.Assert.AreEqual("[1,2,3]", Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(longArr));

                    var enumArr = System.Array.init([Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item1, Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item2, Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item3], Bridge.Newtonsoft.Json.Tests.SerializationTests.E1);
                    Bridge.Test.NUnit.Assert.AreEqual("[\"Item1\",\"Item2\",\"Item3\"]", Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(enumArr));
                },
                EnumWorks: function () {
                    Bridge.Test.NUnit.Assert.AreEqual("\"Item1\"", Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(Bridge.box(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item1, Bridge.Newtonsoft.Json.Tests.SerializationTests.E1, $box_.Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.toString)));
                },
                IListWorks: function () {
                    var list = $asm.$.Bridge.Newtonsoft.Json.Tests.SerializationTests.f1(new (System.Collections.Generic.List$1(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1))());
                    Bridge.Test.NUnit.Assert.AreEqual("[\"Item1\",\"Item2\",\"Item3\"]", Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(list));
                },
                IDictionaryWorks: function () {
                    var dict = $asm.$.Bridge.Newtonsoft.Json.Tests.SerializationTests.f2(new (System.Collections.Generic.Dictionary$2(System.String,Bridge.Newtonsoft.Json.Tests.SerializationTests.E1))());

                    Bridge.Test.NUnit.Assert.AreEqual("{\"i1\":\"Item1\",\"i2\":\"Item2\",\"i3\":\"Item3\"}", Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(dict));
                },
                TypeWithFieldWorks: function () {
                    var c = new Bridge.Newtonsoft.Json.Tests.SerializationTests.ClassWithFields();
                    var raw = null;
                    raw = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c, 0, {}, true);

                    Bridge.Test.NUnit.Assert.AreEqual$1(System.Convert.toBase64String(c.byteArrayField, null, null, null), raw.byteArrayField, "#1");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.guidField.toString(), raw.guidField, "#2");
                    Bridge.Test.NUnit.Assert.AreEqual$1(Bridge.Reflection.getTypeFullName(Bridge.Newtonsoft.Json.Tests.SerializationTests), raw.typeField, "#3");
                    Bridge.Test.NUnit.Assert.AreEqual$1("a", raw.charField, "#4");
                    Bridge.Test.NUnit.Assert.AreEqual$1(0, raw.longField, "#5");
                    Bridge.Test.NUnit.Assert.AreEqual$1(0, raw.ulongField, "#6");
                    Bridge.Test.NUnit.Assert.AreEqual$1(0, raw.decimalField, "#7");
                    Bridge.Test.NUnit.Assert.NotNull$1(raw.dateField, "#8");
                    Bridge.Test.NUnit.Assert.AreEqual$1(c.dateField.toJSON(), raw.dateField, System.String.concat("#9 ", raw.dateField));
                    Bridge.Test.NUnit.Assert.AreEqual$1("Item1", raw.enumField, "#10");
                    Bridge.Test.NUnit.Assert.AreEqual$1(System.Array.init([1, 2, 3], System.Int32), raw.arrayField, "#11");
                    Bridge.Test.NUnit.Assert.AreEqual$1(System.Array.init(["Item1", "Item2", "Item3"], System.String), raw.listField, "#12");
                    Bridge.Test.NUnit.Assert.AreDeepEqual$1({ i1: "Item1", i2: "Item2", i3: "Item3" }, raw.dictField, "#12");
                },
                ComplexPropertiesWorks: function () {
                    var $t;
                    var c = new Bridge.Newtonsoft.Json.Tests.SerializationTests.Class1();

                    c.Sub1 = ($t=new Bridge.Newtonsoft.Json.Tests.SerializationTests.SubClass1(), $t.Owner = c, $t.List1 = $asm.$.Bridge.Newtonsoft.Json.Tests.SerializationTests.f3(new (System.Collections.Generic.List$1(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1))()), $t);

                    c.Sub2 = ($t=new Bridge.Newtonsoft.Json.Tests.SerializationTests.SubClass2(), $t.Owner = c, $t.List1 = $asm.$.Bridge.Newtonsoft.Json.Tests.SerializationTests.f4(new (System.Collections.Generic.List$1(System.Char))()), $t);

                    var json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c);
                    Bridge.Test.NUnit.Assert.AreEqual("{\"Sub1\":{\"List1\":[\"Item1\",\"Item2\",\"Item3\"]},\"Sub2\":{\"List1\":[\"a\",\"b\",\"c\"]}}", json);
                },
                CamelCaseSettingWorks: function () {
                    var $t;
                    var c = new Bridge.Newtonsoft.Json.Tests.SerializationTests.Class2();
                    var json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c, ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.ContractResolver = new Bridge.Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver(), $t));
                    Bridge.Test.NUnit.Assert.AreEqual("{\"intProp\":0}", json);

                    json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c);
                    Bridge.Test.NUnit.Assert.AreEqual("{\"IntProp\":0}", json);
                },
                IgnoreNullValueWorks: function () {
                    var $t;
                    var c = new Bridge.Newtonsoft.Json.Tests.SerializationTests.Class3();
                    var json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c, ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.NullValueHandling = Bridge.Newtonsoft.Json.NullValueHandling.Ignore, $t));
                    Bridge.Test.NUnit.Assert.AreEqual("{}", json);

                    json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c);
                    Bridge.Test.NUnit.Assert.AreEqual("{\"StringProp\":null}", json);
                },
                TypeNameHandlingWorks: function () {
                    var $t;
                    var c = new Bridge.Newtonsoft.Json.Tests.SerializationTests.Class3();

                    var json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(c, ($t=new Bridge.Newtonsoft.Json.JsonSerializerSettings(), $t.TypeNameHandling = Bridge.Newtonsoft.Json.TypeNameHandling.Objects, $t));

                    Bridge.Test.NUnit.Assert.AreEqual("{\"$type\":\"Bridge.Newtonsoft.Json.Tests.SerializationTests+Class3, Bridge.Newtonsoft.Json.Tests\",\"StringProp\":null}", json);
                },
                AnonymousTypesWorks: function () {
                    var v = new $asm.$AnonymousType$1(108, "Hello");
                    var json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(v);

                    Bridge.Test.NUnit.Assert.AreEqual("{\"Amount\":108,\"Message\":\"Hello\"}", json);
                },
                FormattingWorks: function () {
                    var v = new $asm.$AnonymousType$1(108, "Hello");
                    var json = Bridge.Newtonsoft.Json.JsonConvert.SerializeObject(v, Bridge.Newtonsoft.Json.Formatting.Indented);

                    Bridge.Test.NUnit.Assert.AreEqual("{\n  \"Amount\": 108,\n  \"Message\": \"Hello\"\n}", json);
                }
            }
        }
    });

    Bridge.ns("Bridge.Newtonsoft.Json.Tests.SerializationTests", $asm.$);

    Bridge.apply($asm.$.Bridge.Newtonsoft.Json.Tests.SerializationTests, {
        f1: function (_o12) {
            _o12.add(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item1);
            _o12.add(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item2);
            _o12.add(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item3);
            return _o12;
        },
        f2: function (_o13) {
            _o13.set("i1", Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item1);
            _o13.set("i2", Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item2);
            _o13.set("i3", Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item3);
            return _o13;
        },
        f3: function (_o14) {
            _o14.add(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item1);
            _o14.add(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item2);
            _o14.add(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item3);
            return _o14;
        },
        f4: function (_o15) {
            _o15.add(97);
            _o15.add(98);
            _o15.add(99);
            return _o15;
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.SerializationTests.Class1", {
        props: {
            Sub1: null,
            Sub2: null
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.SerializationTests.Class2", {
        props: {
            IntProp: 0
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.SerializationTests.Class3", {
        props: {
            StringProp: null
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.SerializationTests.ClassWithFields", {
        fields: {
            byteArrayField: null,
            guidField: null,
            typeField: null,
            charField: 0,
            longField: System.Int64(0),
            ulongField: System.UInt64(0),
            decimalField: System.Decimal(0.0),
            dateField: null,
            enumField: 0,
            arrayField: null,
            listField: null,
            dictField: null
        },
        ctors: {
            init: function () {
                this.guidField = new System.Guid();
                this.dateField = System.DateTime.getDefaultValue();
                this.byteArrayField = System.Array.init([1, 2, 3], System.Byte);
                this.guidField = System.Guid.newGuid();
                this.typeField = Bridge.Newtonsoft.Json.Tests.SerializationTests;
                this.charField = 97;
                this.dateField = new Date(2010, 6 - 1, 10, 12, 0, 0, 0);
                this.arrayField = System.Array.init([1, 2, 3], System.Int32);
                this.listField = $asm.$.Bridge.Newtonsoft.Json.Tests.SerializationTests.ClassWithFields.f1(new (System.Collections.Generic.List$1(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1))());
                this.dictField = $asm.$.Bridge.Newtonsoft.Json.Tests.SerializationTests.ClassWithFields.f2(new (System.Collections.Generic.Dictionary$2(System.String,Bridge.Newtonsoft.Json.Tests.SerializationTests.E1))());
            }
        }
    });

    Bridge.ns("Bridge.Newtonsoft.Json.Tests.SerializationTests.ClassWithFields", $asm.$);

    Bridge.apply($asm.$.Bridge.Newtonsoft.Json.Tests.SerializationTests.ClassWithFields, {
        f1: function (_o10) {
            _o10.add(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item1);
            _o10.add(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item2);
            _o10.add(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item3);
            return _o10;
        },
        f2: function (_o11) {
            _o11.set("i1", Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item1);
            _o11.set("i2", Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item2);
            _o11.set("i3", Bridge.Newtonsoft.Json.Tests.SerializationTests.E1.Item3);
            return _o11;
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.SerializationTests.E1", {
        $kind: "enum",
        statics: {
            fields: {
                Item1: 0,
                Item2: 1,
                Item3: 2
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.SerializationTests.SubClass1", {
        props: {
            Owner: null,
            List1: null
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.SerializationTests.SubClass2", {
        props: {
            Owner: null,
            List1: null
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.Utilities.DecimalHelper", {
        statics: {
            methods: {
                AssertIsDecimalAndEqualTo$1: function (v, d, message) {
                    if (message === void 0) { message = null; }
                    Bridge.Test.NUnit.Assert.AreStrictEqual$1(true, Bridge.is(v, System.Decimal), message);
                    Bridge.Test.NUnit.Assert.AreStrictEqual$1(System.Double.format(d, "G"), v.toString(), message);
                },
                AssertIsDecimalAndEqualTo: function (v, d, message) {
                    if (message === void 0) { message = null; }
                    Bridge.Test.NUnit.Assert.AreStrictEqual$1(true, Bridge.is(v, System.Decimal), message);
                    Bridge.Test.NUnit.Assert.AreStrictEqual$1(Bridge.Int.format(d, "G"), v.toString(), message);
                }
            }
        }
    });

    Bridge.define("Bridge.Newtonsoft.Json.Tests.DeserializationTests.Person", {
        inherits: [Bridge.Newtonsoft.Json.Tests.DeserializationTests.INamedEntity],
        props: {
            Id: null,
            Name: null,
            Address: null
        },
        alias: [
            "Name", "Bridge$Newtonsoft$Json$Tests$DeserializationTests$INamedEntity$Name"
        ],
        ctors: {
            init: function () {
                this.Id = new System.Guid();
            },
            ctor: function (id, name, city, street) {
                this.$initialize();                var $t;

                this.Id = id;
                this.Name = name;
                this.Address = ($t=new Bridge.Newtonsoft.Json.Tests.DeserializationTests.Address(), $t.City = city, $t.Street = street, $t);
        }
    },
    methods: {
        toString: function () {
            return System.String.format("{0} {1} {2} {3}", this.Id, this.Name, this.Address.Street, this.Address.City);
        }
    }
    });

    var $box_ = {};

    Bridge.ns("System.Char", $box_);

    Bridge.apply($box_.System.Char, {
        toString: function (obj) { return String.fromCharCode(obj); },
        getHashCode: function (obj) { return System.Char.getHashCode(obj); }
    });

    Bridge.ns("System.DateTime", $box_);

    Bridge.apply($box_.System.DateTime, {
        toString: function (obj) { return System.DateTime.format(obj); }
    });

    Bridge.ns("Bridge.Newtonsoft.Json.Tests.SerializationTests.E1", $box_);

    Bridge.apply($box_.Bridge.Newtonsoft.Json.Tests.SerializationTests.E1, {
        toString: function (obj) { return System.Enum.toString(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1, obj); }
    });

    var $m = Bridge.setMetadata,
        $n = [Bridge.Newtonsoft.Json.Tests,System,System.Collections.Generic,Bridge.Newtonsoft.Json.Tests.Issues];
    $m($n[0].DeserializationTests.ClassWithFieldsAndNoInit, function () { return {"td":$n[0].DeserializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"arrayField","t":4,"rt":$n[1].Array.type(System.Int32),"sn":"arrayField"},{"a":2,"n":"byteArrayField","t":4,"rt":$n[1].Array.type(System.Byte),"sn":"byteArrayField"},{"a":2,"n":"charField","t":4,"rt":$n[1].Char,"sn":"charField"},{"a":2,"n":"dateField","t":4,"rt":$n[1].DateTime,"sn":"dateField"},{"a":2,"n":"decimalField","t":4,"rt":$n[1].Decimal,"sn":"decimalField"},{"a":2,"n":"dictField","t":4,"rt":$n[2].IDictionary$2(System.String,Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1),"sn":"dictField"},{"a":2,"n":"enumField","t":4,"rt":$n[0].DeserializationTests.E1,"sn":"enumField"},{"a":2,"n":"guidField","t":4,"rt":$n[1].Guid,"sn":"guidField"},{"a":2,"n":"listField","t":4,"rt":$n[2].IList$1(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1),"sn":"listField"},{"a":2,"n":"longField","t":4,"rt":$n[1].Int64,"sn":"longField"},{"a":2,"n":"typeField","t":4,"rt":Function,"sn":"typeField"},{"a":2,"n":"ulongField","t":4,"rt":$n[1].UInt64,"sn":"ulongField"}]}; });
    $m($n[0].DeserializationTests.ClassWithFields, function () { return {"td":$n[0].DeserializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"arrayField","t":4,"rt":$n[1].Array.type(System.Int32),"sn":"arrayField"},{"a":2,"n":"byteArrayField","t":4,"rt":$n[1].Array.type(System.Byte),"sn":"byteArrayField"},{"a":2,"n":"charField","t":4,"rt":$n[1].Char,"sn":"charField"},{"a":2,"n":"dateField","t":4,"rt":$n[1].DateTime,"sn":"dateField"},{"a":2,"n":"decimalField","t":4,"rt":$n[1].Decimal,"sn":"decimalField"},{"a":2,"n":"dictField","t":4,"rt":$n[2].IDictionary$2(System.String,Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1),"sn":"dictField"},{"a":2,"n":"enumField","t":4,"rt":$n[0].DeserializationTests.E1,"sn":"enumField"},{"a":2,"n":"guidField","t":4,"rt":$n[1].Guid,"sn":"guidField"},{"a":2,"n":"listField","t":4,"rt":$n[2].IList$1(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1),"sn":"listField"},{"a":2,"n":"longField","t":4,"rt":$n[1].Int64,"sn":"longField"},{"a":2,"n":"typeField","t":4,"rt":Function,"sn":"typeField"},{"a":2,"n":"ulongField","t":4,"rt":$n[1].UInt64,"sn":"ulongField"}]}; });
    $m($n[0].DeserializationTests.Class1, function () { return {"td":$n[0].DeserializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Sub1","t":16,"rt":$n[0].DeserializationTests.SubClass1,"g":{"a":2,"n":"get_Sub1","t":8,"rt":$n[0].DeserializationTests.SubClass1,"fg":"Sub1"},"s":{"a":2,"n":"set_Sub1","t":8,"p":[$n[0].DeserializationTests.SubClass1],"rt":$n[1].Void,"fs":"Sub1"},"fn":"Sub1"},{"a":2,"n":"Sub2","t":16,"rt":$n[0].DeserializationTests.SubClass2,"g":{"a":2,"n":"get_Sub2","t":8,"rt":$n[0].DeserializationTests.SubClass2,"fg":"Sub2"},"s":{"a":2,"n":"set_Sub2","t":8,"p":[$n[0].DeserializationTests.SubClass2],"rt":$n[1].Void,"fs":"Sub2"},"fn":"Sub2"}]}; });
    $m($n[0].DeserializationTests.SubClass1, function () { return {"td":$n[0].DeserializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"List1","t":16,"rt":$n[2].List$1(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1),"g":{"a":2,"n":"get_List1","t":8,"rt":$n[2].List$1(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1),"fg":"List1"},"s":{"a":2,"n":"set_List1","t":8,"p":[$n[2].List$1(Bridge.Newtonsoft.Json.Tests.DeserializationTests.E1)],"rt":$n[1].Void,"fs":"List1"},"fn":"List1"},{"a":2,"n":"Owner","t":16,"rt":$n[0].DeserializationTests.Class1,"g":{"a":2,"n":"get_Owner","t":8,"rt":$n[0].DeserializationTests.Class1,"fg":"Owner"},"s":{"a":2,"n":"set_Owner","t":8,"p":[$n[0].DeserializationTests.Class1],"rt":$n[1].Void,"fs":"Owner"},"fn":"Owner"}]}; });
    $m($n[0].DeserializationTests.SubClass2, function () { return {"td":$n[0].DeserializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"List1","t":16,"rt":$n[2].List$1(System.Char),"g":{"a":2,"n":"get_List1","t":8,"rt":$n[2].List$1(System.Char),"fg":"List1"},"s":{"a":2,"n":"set_List1","t":8,"p":[$n[2].List$1(System.Char)],"rt":$n[1].Void,"fs":"List1"},"fn":"List1"},{"a":2,"n":"Owner","t":16,"rt":$n[0].DeserializationTests.Class1,"g":{"a":2,"n":"get_Owner","t":8,"rt":$n[0].DeserializationTests.Class1,"fg":"Owner"},"s":{"a":2,"n":"set_Owner","t":8,"p":[$n[0].DeserializationTests.Class1],"rt":$n[1].Void,"fs":"Owner"},"fn":"Owner"}]}; });
    $m($n[0].DeserializationTests.Class2, function () { return {"td":$n[0].DeserializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"IntProp","t":16,"rt":$n[1].Int32,"g":{"a":2,"n":"get_IntProp","t":8,"rt":$n[1].Int32,"fg":"IntProp"},"s":{"a":2,"n":"set_IntProp","t":8,"p":[$n[1].Int32],"rt":$n[1].Void,"fs":"IntProp"},"fn":"IntProp"}]}; });
    $m($n[0].DeserializationTests.Class3, function () { return {"td":$n[0].DeserializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"StringProp","t":16,"rt":$n[1].String,"g":{"a":2,"n":"get_StringProp","t":8,"rt":$n[1].String,"fg":"StringProp"},"s":{"a":2,"n":"set_StringProp","t":8,"p":[$n[1].String],"rt":$n[1].Void,"fs":"StringProp"},"fn":"StringProp"}]}; });
    $m($n[0].DeserializationTests.INamedEntity, function () { return {"td":$n[0].DeserializationTests,"att":163,"a":1,"m":[{"ab":true,"a":2,"n":"Name","t":16,"rt":$n[1].String,"g":{"ab":true,"a":2,"n":"get_Name","t":8,"rt":$n[1].String,"fg":"Bridge$Newtonsoft$Json$Tests$DeserializationTests$INamedEntity$Name"},"s":{"ab":true,"a":2,"n":"set_Name","t":8,"p":[$n[1].String],"rt":$n[1].Void,"fs":"Bridge$Newtonsoft$Json$Tests$DeserializationTests$INamedEntity$Name"},"fn":"Bridge$Newtonsoft$Json$Tests$DeserializationTests$INamedEntity$Name"}]}; });
    $m($n[0].DeserializationTests.Person, function () { return {"td":$n[0].DeserializationTests,"att":1048579,"a":1,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].Guid,$n[1].String,$n[1].String,$n[1].String],"pi":[{"n":"id","pt":$n[1].Guid,"ps":0},{"n":"name","pt":$n[1].String,"ps":1},{"n":"city","pt":$n[1].String,"ps":2},{"n":"street","pt":$n[1].String,"ps":3}],"sn":"ctor"},{"ov":true,"a":2,"n":"ToString","t":8,"sn":"toString","rt":$n[1].String},{"a":2,"n":"Address","t":16,"rt":$n[0].DeserializationTests.Address,"g":{"a":2,"n":"get_Address","t":8,"rt":$n[0].DeserializationTests.Address,"fg":"Address"},"s":{"a":2,"n":"set_Address","t":8,"p":[$n[0].DeserializationTests.Address],"rt":$n[1].Void,"fs":"Address"},"fn":"Address"},{"a":2,"n":"Id","t":16,"rt":$n[1].Guid,"g":{"a":2,"n":"get_Id","t":8,"rt":$n[1].Guid,"fg":"Id"},"s":{"a":2,"n":"set_Id","t":8,"p":[$n[1].Guid],"rt":$n[1].Void,"fs":"Id"},"fn":"Id"},{"a":2,"n":"Name","t":16,"rt":$n[1].String,"g":{"a":2,"n":"get_Name","t":8,"rt":$n[1].String,"fg":"Name"},"s":{"a":2,"n":"set_Name","t":8,"p":[$n[1].String],"rt":$n[1].Void,"fs":"Name"},"fn":"Name"}]}; });
    $m($n[0].DeserializationTests.Address, function () { return {"td":$n[0].DeserializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"City","t":16,"rt":$n[1].String,"g":{"a":2,"n":"get_City","t":8,"rt":$n[1].String,"fg":"City"},"s":{"a":2,"n":"set_City","t":8,"p":[$n[1].String],"rt":$n[1].Void,"fs":"City"},"fn":"City"},{"a":2,"n":"Street","t":16,"rt":$n[1].String,"g":{"a":2,"n":"get_Street","t":8,"rt":$n[1].String,"fg":"Street"},"s":{"a":2,"n":"set_Street","t":8,"p":[$n[1].String],"rt":$n[1].Void,"fs":"Street"},"fn":"Street"}]}; });
    $m($n[0].SerializationTests.ClassWithFields, function () { return {"td":$n[0].SerializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"arrayField","t":4,"rt":$n[1].Array.type(System.Int32),"sn":"arrayField"},{"a":2,"n":"byteArrayField","t":4,"rt":$n[1].Array.type(System.Byte),"sn":"byteArrayField"},{"a":2,"n":"charField","t":4,"rt":$n[1].Char,"sn":"charField"},{"a":2,"n":"dateField","t":4,"rt":$n[1].DateTime,"sn":"dateField"},{"a":2,"n":"decimalField","t":4,"rt":$n[1].Decimal,"sn":"decimalField"},{"a":2,"n":"dictField","t":4,"rt":$n[2].IDictionary$2(System.String,Bridge.Newtonsoft.Json.Tests.SerializationTests.E1),"sn":"dictField"},{"a":2,"n":"enumField","t":4,"rt":$n[0].SerializationTests.E1,"sn":"enumField"},{"a":2,"n":"guidField","t":4,"rt":$n[1].Guid,"sn":"guidField"},{"a":2,"n":"listField","t":4,"rt":$n[2].IList$1(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1),"sn":"listField"},{"a":2,"n":"longField","t":4,"rt":$n[1].Int64,"sn":"longField"},{"a":2,"n":"typeField","t":4,"rt":Function,"sn":"typeField"},{"a":2,"n":"ulongField","t":4,"rt":$n[1].UInt64,"sn":"ulongField"}]}; });
    $m($n[0].SerializationTests.Class1, function () { return {"td":$n[0].SerializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Sub1","t":16,"rt":$n[0].SerializationTests.SubClass1,"g":{"a":2,"n":"get_Sub1","t":8,"rt":$n[0].SerializationTests.SubClass1,"fg":"Sub1"},"s":{"a":2,"n":"set_Sub1","t":8,"p":[$n[0].SerializationTests.SubClass1],"rt":$n[1].Void,"fs":"Sub1"},"fn":"Sub1"},{"a":2,"n":"Sub2","t":16,"rt":$n[0].SerializationTests.SubClass2,"g":{"a":2,"n":"get_Sub2","t":8,"rt":$n[0].SerializationTests.SubClass2,"fg":"Sub2"},"s":{"a":2,"n":"set_Sub2","t":8,"p":[$n[0].SerializationTests.SubClass2],"rt":$n[1].Void,"fs":"Sub2"},"fn":"Sub2"}]}; });
    $m($n[0].SerializationTests.SubClass1, function () { return {"td":$n[0].SerializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"List1","t":16,"rt":$n[2].List$1(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1),"g":{"a":2,"n":"get_List1","t":8,"rt":$n[2].List$1(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1),"fg":"List1"},"s":{"a":2,"n":"set_List1","t":8,"p":[$n[2].List$1(Bridge.Newtonsoft.Json.Tests.SerializationTests.E1)],"rt":$n[1].Void,"fs":"List1"},"fn":"List1"},{"a":2,"n":"Owner","t":16,"rt":$n[0].SerializationTests.Class1,"g":{"a":2,"n":"get_Owner","t":8,"rt":$n[0].SerializationTests.Class1,"fg":"Owner"},"s":{"a":2,"n":"set_Owner","t":8,"p":[$n[0].SerializationTests.Class1],"rt":$n[1].Void,"fs":"Owner"},"fn":"Owner"}]}; });
    $m($n[0].SerializationTests.SubClass2, function () { return {"td":$n[0].SerializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"List1","t":16,"rt":$n[2].List$1(System.Char),"g":{"a":2,"n":"get_List1","t":8,"rt":$n[2].List$1(System.Char),"fg":"List1"},"s":{"a":2,"n":"set_List1","t":8,"p":[$n[2].List$1(System.Char)],"rt":$n[1].Void,"fs":"List1"},"fn":"List1"},{"a":2,"n":"Owner","t":16,"rt":$n[0].SerializationTests.Class1,"g":{"a":2,"n":"get_Owner","t":8,"rt":$n[0].SerializationTests.Class1,"fg":"Owner"},"s":{"a":2,"n":"set_Owner","t":8,"p":[$n[0].SerializationTests.Class1],"rt":$n[1].Void,"fs":"Owner"},"fn":"Owner"}]}; });
    $m($n[0].SerializationTests.Class2, function () { return {"td":$n[0].SerializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"IntProp","t":16,"rt":$n[1].Int32,"g":{"a":2,"n":"get_IntProp","t":8,"rt":$n[1].Int32,"fg":"IntProp"},"s":{"a":2,"n":"set_IntProp","t":8,"p":[$n[1].Int32],"rt":$n[1].Void,"fs":"IntProp"},"fn":"IntProp"}]}; });
    $m($n[0].SerializationTests.Class3, function () { return {"td":$n[0].SerializationTests,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"StringProp","t":16,"rt":$n[1].String,"g":{"a":2,"n":"get_StringProp","t":8,"rt":$n[1].String,"fg":"StringProp"},"s":{"a":2,"n":"set_StringProp","t":8,"p":[$n[1].String],"rt":$n[1].Void,"fs":"StringProp"},"fn":"StringProp"}]}; });
    $m($n[3].Bridge1438.Foo, function () { return {"td":$n[3].Bridge1438,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"SomeMethod","t":8,"sn":"SomeMethod","rt":$n[1].String},{"a":2,"n":"Value","t":16,"rt":$n[1].Int32,"g":{"a":2,"n":"get_Value","t":8,"rt":$n[1].Int32,"fg":"Value"},"s":{"a":2,"n":"set_Value","t":8,"p":[$n[1].Int32],"rt":$n[1].Void,"fs":"Value"},"fn":"Value"}]}; });
    $m($n[3].Bridge2641.Class1, function () { return {"td":$n[3].Bridge2641,"att":1048578,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Field1","t":4,"rt":$n[1].Int32,"sn":"Field1"},{"a":2,"n":"field2","t":4,"rt":$n[1].Int32,"sn":"field2"}]}; });
    $m($n[3].Bridge2679.Test1, function () { return {"td":$n[3].Bridge2679,"att":1048578,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].Int32],"pi":[{"n":"value","pt":$n[1].Int32,"ps":0}],"sn":"ctor"},{"a":2,"n":"Value","t":16,"rt":$n[1].Int32,"g":{"a":2,"n":"get_Value","t":8,"rt":$n[1].Int32,"fg":"Value"},"s":{"a":1,"n":"set_Value","t":8,"p":[$n[1].Int32],"rt":$n[1].Void,"fs":"Value"},"fn":"Value"}]}; });
    $m($n[3].Bridge2679.Test2$1, function (T) { return {"td":$n[3].Bridge2679,"att":1048578,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[T],"pi":[{"n":"value","pt":T,"ps":0}],"sn":"ctor"},{"a":2,"n":"Value","t":16,"rt":T,"g":{"a":2,"n":"get_Value","t":8,"rt":T,"fg":"Value"},"s":{"a":1,"n":"set_Value","t":8,"p":[T],"rt":$n[1].Void,"fs":"Value"},"fn":"Value"}]}; });
    $m($n[3].Bridge501A, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Items","t":4,"rt":$n[1].String,"sn":"Items"}]}; });
    $m($n[3].Bridge501B, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"}]}; });
});