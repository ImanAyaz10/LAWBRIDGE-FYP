const Template = require('../models/Template');

const defaultTemplates = [
  {
    title: "Affidavit of Income",
    code: "affidavit_of_income",
    category: "Affidavits",
    description: "Used to declare and verify a person's monthly income under oath.",
    fields: [
      { name: "deponentName", label: "Deponent Name", type: "text", placeholder: "e.g. John Doe", required: true },
      { name: "parentName", label: "Father's / Husband's Name", type: "text", placeholder: "e.g. Richard Doe", required: true },
      { name: "cnic", label: "CNIC Number", type: "text", placeholder: "e.g. 37405-1234567-9", required: true },
      { name: "address", label: "Residential Address", type: "text", placeholder: "e.g. House 123, Street 4, Islamabad", required: true },
      { name: "monthlyIncome", label: "Monthly Income (Rs.)", type: "number", placeholder: "e.g. 75000", required: true },
      { name: "incomeSource", label: "Source of Income", type: "text", placeholder: "e.g. salary, business, freelancing, rental income", required: true },
      { name: "day", label: "Verification Day (e.g. 3rd)", type: "text", placeholder: "e.g. 3rd", required: true },
      { name: "month", label: "Verification Month (e.g. June)", type: "text", placeholder: "e.g. June", required: true }
    ],
    contentTemplate: `AFFIDAVIT OF INCOME

This Affidavit of Income is made and sworn by Mr./Ms. {{deponentName}} son/daughter of {{parentName}}, CNIC No. {{cnic}}, resident of {{address}}.

That the deponent solemnly affirms and declares as under:

1. That the deponent is currently earning a monthly income of Rs. {{monthlyIncome}}.
2. That the source of income includes {{incomeSource}}.
3. That this affidavit is being executed for lawful purposes.
4. That the contents stated herein are true and correct to the best of the deponent's knowledge and belief.

DEPONENT: _____________________

Verified on this {{day}} day of {{month}} 2026.`
  },
  {
    title: "Rental Agreement",
    code: "rental_agreement",
    category: "Agreements",
    description: "Standard agreement between a landlord and tenant specifying lease terms.",
    fields: [
      { name: "landlordName", label: "Landlord Name", type: "text", placeholder: "e.g. Ahmad Khan", required: true },
      { name: "tenantName", label: "Tenant Name", type: "text", placeholder: "e.g. Bilal Ali", required: true },
      { name: "monthlyRent", label: "Monthly Rent (Rs.)", type: "number", placeholder: "e.g. 25000", required: true },
      { name: "securityDeposit", label: "Security Deposit (Rs.)", type: "number", placeholder: "e.g. 50000", required: true },
      { name: "tenancyPeriodMonths", label: "Tenancy Period (Months)", type: "number", placeholder: "e.g. 11", required: true },
      { name: "commencementDate", label: "Commencement Date", type: "date", placeholder: "", required: true }
    ],
    contentTemplate: `RENTAL AGREEMENT

This Rental Agreement is executed between Mr./Ms. {{landlordName}} (Landlord) and Mr./Ms. {{tenantName}} (Tenant).

Terms & Conditions:

1. Monthly Rent shall be Rs. {{monthlyRent}}.
2. Security Deposit shall be Rs. {{securityDeposit}}.
3. The tenancy period shall be for {{tenancyPeriodMonths}} months commencing from {{commencementDate}}.
4. Utility bills shall be paid by the Tenant.
5. The Tenant shall not sublet the premises without written permission.

LANDLORD SIGNATURE: _____________________

TENANT SIGNATURE: _____________________`
  },
  {
    title: "Employment Contract",
    code: "employment_contract",
    category: "Contracts",
    description: "Agreement between an employer and employee defining role and terms.",
    fields: [
      { name: "employerName", label: "Employer Name", type: "text", placeholder: "e.g. Apex Solutions", required: true },
      { name: "employeeName", label: "Employee Name", type: "text", placeholder: "e.g. Sarah Khan", required: true },
      { name: "designation", label: "Designation", type: "text", placeholder: "e.g. Software Engineer", required: true },
      { name: "monthlySalary", label: "Monthly Salary (Rs.)", type: "number", placeholder: "e.g. 120000", required: true },
      { name: "workingHours", label: "Working Hours", type: "text", placeholder: "e.g. 9 AM - 5 PM", required: true }
    ],
    contentTemplate: `EMPLOYMENT CONTRACT

This Employment Contract is made between {{employerName}} (Employer) and {{employeeName}} (Employee).

1. Designation: {{designation}}
2. Monthly Salary: Rs. {{monthlySalary}}
3. Working Hours: {{workingHours}}
4. The employee shall observe confidentiality and professional conduct.
5. Either party may terminate the contract with prior notice of 30 days.

EMPLOYER SIGNATURE: _____________________

EMPLOYEE SIGNATURE: _____________________`
  },
  {
    title: "Power of Attorney",
    code: "power_of_attorney",
    category: "Corporate",
    description: "Authorizes a trusted individual to act on your behalf in legal/financial matters.",
    fields: [
      { name: "principalName", label: "Principal Name", type: "text", placeholder: "e.g. Muhammad Asif", required: true },
      { name: "parentName", label: "Father's / Husband's Name", type: "text", placeholder: "e.g. Muhammad Iqbal", required: true },
      { name: "principalCnic", label: "Principal CNIC Number", type: "text", placeholder: "e.g. 37405-1111111-1", required: true },
      { name: "principalAddress", label: "Principal Address", type: "text", placeholder: "e.g. Sector G-11, Islamabad", required: true },
      { name: "attorneyName", label: "Attorney Name", type: "text", placeholder: "e.g. Tariq Mehmood", required: true }
    ],
    contentTemplate: `POWER OF ATTORNEY

I, {{principalName}} son/daughter of {{parentName}}, CNIC No. {{principalCnic}}, resident of {{principalAddress}}, hereby appoint {{attorneyName}} as my lawful attorney.

The attorney shall have authority to:
1. Represent me before authorities.
2. Sign and submit documents.
3. Manage matters relating to property/business/legal affairs.

This Power of Attorney shall remain valid unless revoked in writing.

PRINCIPAL SIGNATURE: _____________________`
  },
  {
    title: "Demand Letter",
    code: "demand_letter",
    category: "Corporate",
    description: "Formal notification demanding payment of outstanding dues within a deadline.",
    fields: [
      { name: "recipientName", label: "Recipient Name", type: "text", placeholder: "e.g. Zafar Iqbal", required: true },
      { name: "recipientAddress", label: "Recipient Address", type: "text", placeholder: "e.g. Block B, Gulberg, Lahore", required: true },
      { name: "outstandingAmount", label: "Outstanding Amount (Rs.)", type: "number", placeholder: "e.g. 150000", required: true },
      { name: "advocateName", label: "Advocate Name", type: "text", placeholder: "e.g. Kamran Malik", required: true }
    ],
    contentTemplate: `DEMAND LETTER

To,
{{recipientName}}
{{recipientAddress}}

Subject: DEMAND FOR PAYMENT

Sir/Madam,

You are hereby called upon to pay an outstanding amount of Rs. {{outstandingAmount}} within 7 days from receipt of this notice.

Failure to comply may compel legal proceedings at your risk and cost.

Regards,
Advocate {{advocateName}}`
  },
  {
    title: "Will Template",
    code: "will_template",
    category: "Property",
    description: "Last Will and Testament outlining the distribution of assets upon passing.",
    fields: [
      { name: "testatorName", label: "Testator Name (Your Name)", type: "text", placeholder: "e.g. Yousuf Khan", required: true },
      { name: "parentName", label: "Father's / Husband's Name", type: "text", placeholder: "e.g. Ahmed Khan", required: true },
      { name: "testatorAddress", label: "Testator Address", type: "text", placeholder: "e.g. DHA Phase 6, Karachi", required: true },
      { name: "executorName", label: "Executor Name", type: "text", placeholder: "e.g. Tariq Yousuf", required: true },
      { name: "beneficiaryName", label: "Beneficiary Name", type: "text", placeholder: "e.g. Ayesha Yousuf", required: true }
    ],
    contentTemplate: `LAST WILL AND TESTAMENT

I, {{testatorName}} son/daughter of {{parentName}}, resident of {{testatorAddress}}, being of sound mind, hereby declare this as my last Will.

1. I appoint {{executorName}} as executor of this Will.
2. My movable and immovable assets shall devolve upon {{beneficiaryName}}.
3. All previous wills stand revoked.

TESTATOR SIGNATURE: _____________________`
  },
  {
    title: "Sale Deed",
    code: "sale_deed",
    category: "Property",
    description: "A formal document transferring ownership of property from a seller to a purchaser.",
    fields: [
      { name: "sellerName", label: "Seller Name", type: "text", placeholder: "e.g. Farooq Ahmad", required: true },
      { name: "purchaserName", label: "Purchaser Name", type: "text", placeholder: "e.g. Nadeem Raza", required: true },
      { name: "propertyDescription", label: "Property Description", type: "text", placeholder: "e.g. Plot No 45, Sector F-6, Islamabad", required: true },
      { name: "saleConsideration", label: "Sale Consideration (Rs.)", type: "number", placeholder: "e.g. 5000000", required: true }
    ],
    contentTemplate: `SALE DEED

This Sale Deed is executed between {{sellerName}} (Seller) and {{purchaserName}} (Purchaser).

1. Property Description: {{propertyDescription}}
2. Sale Consideration: Rs. {{saleConsideration}}
3. Possession of the property has been delivered to the Purchaser.
4. The Seller confirms clear and marketable title.

SELLER SIGNATURE: _____________________

PURCHASER SIGNATURE: _____________________`
  },
  {
    title: "Service Agreement",
    code: "service_agreement",
    category: "Agreements",
    description: "Agreement between a service provider and client outlining scope and fees.",
    fields: [
      { name: "serviceProviderName", label: "Service Provider Name", type: "text", placeholder: "e.g. Pixel Craft Studio", required: true },
      { name: "clientName", label: "Client Name", type: "text", placeholder: "e.g. TechCorp Ltd", required: true },
      { name: "scopeOfServices", label: "Scope of Services", type: "text", placeholder: "e.g. Web Development and Maintenance", required: true },
      { name: "serviceCharges", label: "Service Charges (Rs.)", type: "number", placeholder: "e.g. 80000", required: true },
      { name: "durationOfAgreement", label: "Duration of Agreement", type: "text", placeholder: "e.g. 6 Months", required: true }
    ],
    contentTemplate: `SERVICE AGREEMENT

This Service Agreement is entered into between {{serviceProviderName}} (Service Provider) and {{clientName}} (Client).

1. Scope of Services: {{scopeOfServices}}
2. Service Charges: Rs. {{serviceCharges}}
3. Duration of Agreement: {{durationOfAgreement}}
4. Disputes shall be resolved amicably or through competent courts.

SERVICE PROVIDER SIGNATURE: _____________________

CLIENT SIGNATURE: _____________________`
  }
];

const seedTemplates = async () => {
  try {
    const count = await Template.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding default legal templates...');
      await Template.insertMany(defaultTemplates);
      console.log('✅ Default templates seeded successfully!');
    } else {
      console.log('ℹ️ Legal templates already exist in database, skipping seed.');
    }
  } catch (error) {
    console.error('❌ Failed to seed templates:', error);
  }
};

module.exports = seedTemplates;
