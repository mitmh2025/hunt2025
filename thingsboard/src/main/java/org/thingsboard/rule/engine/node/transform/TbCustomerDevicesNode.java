/**
 * Copyright © 2018-2024 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.thingsboard.rule.engine.node.transform;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.thingsboard.common.util.JacksonUtil;
import org.thingsboard.rule.engine.api.EmptyNodeConfiguration;
import org.thingsboard.rule.engine.api.RuleNode;
import org.thingsboard.rule.engine.api.TbContext;
import org.thingsboard.rule.engine.api.TbNode;
import org.thingsboard.rule.engine.api.TbNodeConfiguration;
import org.thingsboard.rule.engine.api.TbNodeException;
import org.thingsboard.rule.engine.api.util.TbNodeUtils;
import org.thingsboard.server.common.data.Device;
import org.thingsboard.server.common.data.EntityType;
import org.thingsboard.server.common.data.id.CustomerId;
import org.thingsboard.server.common.data.id.EntityId;
import org.thingsboard.server.common.data.page.PageData;
import org.thingsboard.server.common.data.page.PageLink;
import org.thingsboard.server.common.data.plugin.ComponentType;
import org.thingsboard.server.common.msg.TbMsg;

import java.util.Iterator;

@Slf4j
@RuleNode(
        type = ComponentType.TRANSFORMATION,
        name = "change originator to customer devices",
        configClazz = EmptyNodeConfiguration.class,
        nodeDescription = "Generates a new message for each of a customer's devices",
        nodeDetails = "If the input is a customer, look up the customer's devices and generate a new message for each device")
public class TbCustomerDevicesNode implements TbNode {
    @Override
    public void init(TbContext ctx, TbNodeConfiguration configuration) throws TbNodeException {
    }

    @Override
    public void onMsg(TbContext ctx, TbMsg msg) {
        EntityId msgOriginator = msg.getOriginator();
        // Checking that the message originator is a Customer;
        if (EntityType.CUSTOMER.equals(msgOriginator.getEntityType())) {
            CustomerId customerId = new CustomerId(msgOriginator.getId());
            boolean hasNext = true;
            // Creating the page link to iterate through the devices;
            PageLink pageLink = new PageLink(1024);
            while (hasNext) {
                // Using the Device Service to get devices from the database;
                PageData<Device> devices = ctx.getDeviceService().findDevicesByTenantIdAndCustomerId(ctx.getTenantId(), customerId, pageLink);
                hasNext = devices.hasNext();
                pageLink = pageLink.nextPageLink();
                for (Device device : devices.getData()) {
                    // Creating new message with different originator
                    TbMsg newMsg = TbMsg.newMsg(msg.getQueueName(), msg.getType(), device.getId(), msg.getMetaData(), msg.getData());
                    // Pushing new message to the queue instead of tellNext to make sure that the message will be persisted;
                    ctx.enqueueForTellNext(newMsg, "Success");
                }
            }
            // Don't forget to acknowledge original message or use ctx.tellSuccess(msg);
            ctx.ack(msg);
        } else {
            ctx.tellFailure(msg, new IllegalArgumentException("Msg originator is not Customer!"));
        }
    }

    @Override
    public void destroy() {
    }
}
