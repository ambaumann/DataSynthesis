package io.connectedhealth.idaas.datasynthesis.services;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

import io.connectedhealth.idaas.datasynthesis.dtos.SSN;
import io.connectedhealth.idaas.datasynthesis.exception.DataSynthesisException;
import io.connectedhealth.idaas.datasynthesis.models.DataGeneratedSocialSecurityNumberEntity;
import io.connectedhealth.idaas.datasynthesis.models.RefDataApplicationEntity;
import io.connectedhealth.idaas.datasynthesis.models.RefDataStatusEntity;

import org.apache.commons.lang3.StringUtils;

import io.quarkus.hibernate.orm.panache.PanacheQuery;

@ApplicationScoped
public class SSNService extends RandomizerService<DataGeneratedSocialSecurityNumberEntity, SSN> {
    @Override
    protected long count(Object... queryOpts) {
        if (queryOpts.length <= 1) {
            return DataGeneratedSocialSecurityNumberEntity.count();
        }
        return DataGeneratedSocialSecurityNumberEntity.count((String)queryOpts[0], Arrays.copyOfRange(queryOpts, 1, queryOpts.length));
    }

    @Override
    protected PanacheQuery<DataGeneratedSocialSecurityNumberEntity> findAll(Object... queryOpts) {
        if (queryOpts.length <= 1) {
            return DataGeneratedSocialSecurityNumberEntity.findAll();
        }
        return DataGeneratedSocialSecurityNumberEntity.find((String)queryOpts[0], Arrays.copyOfRange(queryOpts, 1, queryOpts.length));
    }

    @Override
    protected SSN mapEntityToDTO(DataGeneratedSocialSecurityNumberEntity entity) {
        return new SSN(entity.getSocialSecurityNumberValue());
    } 

    // Generate Data
    @Transactional
    public List<DataGeneratedSocialSecurityNumberEntity> generateSSN(long generationCounter) throws DataSynthesisException {
        List<DataGeneratedSocialSecurityNumberEntity> ssnList = new ArrayList<DataGeneratedSocialSecurityNumberEntity>((int) generationCounter);
        int upperBound1 = 999;
        int upperBound2 = 99;
        int upperBound3 = 9999;
        RefDataApplicationEntity app = getRegisteredApp();
        RefDataStatusEntity defaultStatus = getDefaultStatus();
        Timestamp createdDate = new Timestamp(System.currentTimeMillis());

        for (int i = 0; i < generationCounter;) {
            StringBuilder ssn = new StringBuilder();
            // Create the first 3 random SSN numbers while padding to the correct length
            ssn.append(StringUtils.leftPad(String.valueOf(rand.nextInt(upperBound1 + 1)), 3, "0")).append('-')
                    // Create the middle 2 random SSN numbers while padding to the correct length
                    .append(StringUtils.leftPad(String.valueOf(rand.nextInt(upperBound2 + 1)), 2, "0")).append('-')
                    // Create the ending 4 random SSN numbers while padding to the correct length
                    .append(StringUtils.leftPad(String.valueOf(rand.nextInt(upperBound3 + 1)), 4, "0"));

            DataGeneratedSocialSecurityNumberEntity ssnEntity = new DataGeneratedSocialSecurityNumberEntity(ssn.toString());
            ssnEntity.setRegisteredApp(app);
            ssnEntity.setStatus(defaultStatus);
            ssnEntity.setCreatedDate(createdDate);
            if (ssnEntity.safePersist()) {
                ssnList.add(ssnEntity);
                i++;
            }
        }

        return ssnList;
    }
}
